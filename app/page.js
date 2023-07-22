"use client";

import React, { useState, useEffect } from "react";
import { List } from "antd";
import FoodCombobox from "@/components/FoodCombobox";
import Guess from "@/components/Guess";
import foods from "@/public/foods";
import useLocalStorage from "./hooks/useLocalStorage";
import { generateUniqueNumber } from "@/app/utils";
import EndNotification from "@/components/EndNotification";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

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
