"use client";

import React, { useState, useEffect } from "react";
import { List } from "antd";
import FoodCombobox from "@/components/FoodCombobox";
import Guess from "@/components/Guess";
import foods from "@/public/foods";
import useLocalStorage from "./hooks/useLocalStorage";
import { generateUniqueNumber } from "@/app/utils";
import EndNotification from "@/components/EndNotification";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css"; // this line is optional and imports the provided styles
import SpotifyPreview from "@/components/SpotifyPreview";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState();
  const [trackId, setTrackId] = useState("0j2T0R9dR9qdJYsB7ciXhf"); // <---- Here

  const [selectedFood, setSelectedFood] = useState();
  const [target, setTarget] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useLocalStorage(
    "previousGuesses",
    []
  );
  const guessesLeft = 5 - previousGuesses.length;

  useEffect(() => {
    const random = generateUniqueNumber(foods.length - 1);
    setTarget(foods[random]);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          let parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = "";

    let _token = hash.access_token;
    if (_token) {
      // Set token
      setSpotifyToken(_token);
    }
  }, []);

  const onSubmit = (food) => {
    const val = food.name;
    setSelectedFood(val.name);
    const currFood = foods.find((food) => food.name === val);
    if (currFood) {
      const oldGuesses = [...previousGuesses];
      oldGuesses.unshift(food);
      setPreviousGuesses(oldGuesses);
    }

    setQuery("");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main>
      <EndNotification target={target} previousGuesses={previousGuesses} />
      <div className="column-view">
        <div className="container frosted-glass">
          <div className="section-centered">
            <h1 id="title">Reciple</h1>
            <p className="light-text">
              {guessesLeft} guess{guessesLeft == 1 ? "" : "es"} left
            </p>
            {!spotifyToken && (
              <SpotifyAuth
                redirectUri="https://yeezle.vercel.app/"
                clientID="63bd3faaf3ea45ce811259efb5c99d56"
                scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
                onAccessToken={(token) => setSpotifyToken(token)}
              />
            )}
            {/* Show SpotifyPreview if token and trackId are set */}
            {spotifyToken && trackId && (
              <SpotifyPreview token={spotifyToken} trackId={trackId} />
            )}
            <button onClick={() => setTrackId("4uLU6hMCjMI75M1A2tKUQC")}>
              Play Preview
            </button>
            <FoodCombobox
              foods={foods}
              selectedFood={selectedFood}
              onSubmit={onSubmit}
              setQuery={setQuery}
              query={query}
              gameOver={
                (previousGuesses[0] &&
                  previousGuesses[0].name == target.name) ||
                previousGuesses.length >= 5
              }
            />
            <p style={{ maxWidth: 400 }}>
              Select a recipe from our list and look for highlighted ingredients
              - these are also in the secret dish. Enjoy testing your food
              knowledge and happy guessing!
            </p>
          </div>
          <div>
            {target && previousGuesses.length > 0 && (
              <List
                dataSource={previousGuesses}
                style={{ width: "100%" }}
                renderItem={(item, index) => (
                  <List.Item>
                    <Guess food={item} target={target} />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
