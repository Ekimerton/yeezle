"use client";

import React, { useState, useEffect } from "react";
import { List, notification } from "antd";
import seedrandom from "seedrandom";
import FoodCombobox from "@/components/FoodCombobox";
import Guess from "@/components/Guess";
import Confetti from "@/components/Confetti";
import Timer from "@/components/Timer";
import foods from "@/public/foods";

function getTimeUntilNextNumber() {
  const now = new Date(); // Current date and time
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  ); // Next day at 00:00:00

  const timeRemaining = tomorrow - now; // Time remaining in milliseconds
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Format the time as hh:mm:ss
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formattedTime;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState();
  const [counter, setCounter] = useState(0);

  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [target, setTarget] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  // Function to generate a random number based on the current date
  function generateUniqueNumber(n) {
    const today = new Date().toISOString().split("T")[0];
    const seed = today;
    const rng = seedrandom(seed);
    const uniqueNumber = Math.floor(rng() * (Number(n) + 1));
    return uniqueNumber;
  }

  useEffect(() => {
    const random = generateUniqueNumber(foods.length - 1);
    setTarget(foods[random]);
  }, []);

  const onSubmit = (food) => {
    const val = food.name;
    setSelectedFood(val.name);
    const currFood = foods.find((food) => food.name === val);
    if (currFood) {
      const oldGuesses = [...previousGuesses];
      oldGuesses.unshift(val);
      setPreviousGuesses(oldGuesses);
    }

    if (val === target.name) {
      setGameOver(true);
      api.open({
        message: "Congrats!!",
        description: (
          <div>
            <p>
              Today&apos;s recipe was {target.name}. You got today&apos;s recipe
              in {counter + 1}!
            </p>
            <Timer isModalActive={true} />
            <Confetti />
          </div>
        ),
        duration: 0,
      });
    } else if (counter >= 4) {
      setGameOver(true);
      api.open({
        message: "You failed!!",
        description: `Today's recipe was ${target.name}. Better luck next time!`,
        duration: 0,
      });
    }
    setCounter(counter + 1);
    setQuery("");
  };

  return (
    <main>
      {contextHolder}
      <div className="column-view frosted-glass">
        <div className="container frosted-glass">
          <div className="section-centered">
            <h1 id="title">Reciple</h1>
            <p className="light-text">{5 - counter} guesses left</p>
            <FoodCombobox
              foods={foods}
              selectedFood={selectedFood}
              onSubmit={onSubmit}
              setQuery={setQuery}
              query={query}
              gameOver={gameOver}
            />
            <p style={{ maxWidth: 400 }}>
              Select a recipe from our list and look for highlighted ingredients
              - these are also in the secret dish. Enjoy testing your food
              knowledge and happy guessing!
            </p>
          </div>
          <div>
            {previousGuesses.length > 0 && (
              <List
                dataSource={previousGuesses}
                style={{ width: "100%" }}
                renderItem={(item, index) => (
                  <List.Item>
                    <Guess name={item} target={target} />
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
