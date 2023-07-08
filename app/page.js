"use client";

import React, { useState, useEffect } from "react";
import { List, notification } from "antd";
import seedrandom from "seedrandom";
import FoodCombobox from "@/components/FoodCombobox";
import Guess from "@/components/Guess";
import Confetti from "@/components/Confetti";
import Timer from "@/components/Timer";
import foods from "@/public/foods";

function generateShareableString(previousGuesses, target) {
  let shareableString =
    "I got today's recipe in " + previousGuesses.length + " guesses!\n\n";

  const reverted = [...previousGuesses].reverse();

  for (let i = 0; i < reverted.length; i++) {
    const guess = reverted[i];
    let line = "";

    for (let j = 0; j < guess.ingredients.length; j++) {
      const ingredient = guess.ingredients[j];
      const isCorrect = target.includes(ingredient);
      const square = isCorrect ? "🟩" : "⬜️";
      line += square;
    }

    shareableString += line + "\n";
  }

  return shareableString;
}

// Function to generate a random number based on the current date
function generateUniqueNumber(n) {
  const today = new Date().toISOString().split("T")[0];
  const seed = today;
  const rng = seedrandom(seed);
  const uniqueNumber = Math.floor(rng() * (Number(n) + 1));
  return uniqueNumber;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState();
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [target, setTarget] = useState(0);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const random = generateUniqueNumber(foods.length - 1);
    setTarget(foods[random]);
  }, []);

  useEffect(() => {
    if (previousGuesses.length > 0 && previousGuesses[0].name === target.name) {
      api.open({
        message: "Congrats!!",
        description: (
          <div>
            <p>
              Today&apos;s recipe was {target.name}. You got today&apos;s recipe
              in {previousGuesses.length}!
            </p>
            <a
              onClick={() => {
                navigator.clipboard.writeText(
                  generateShareableString(previousGuesses, target.ingredients)
                );
              }}
            >
              <p>Copy shareable text</p>
            </a>
            <Timer isModalActive={true} />
            <Confetti />
          </div>
        ),
        duration: 0,
      });
    } else if (previousGuesses.length >= 5) {
      api.open({
        message: "You sux!!",
        description: (
          <div>
            <p>
              Today&apos;s recipe was {target.name}. You sux farts out of my
              ass!
            </p>
            <Timer isModalActive={true} />
          </div>
        ),
        duration: 0,
      });
    }
  }, [api, previousGuesses, target]);

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

  return (
    <main>
      {contextHolder}
      <div className="column-view frosted-glass">
        <div className="container frosted-glass">
          <div className="section-centered">
            <h1 id="title">Reciple</h1>
            <p className="light-text">
              {5 - previousGuesses.length} guesses left
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
            {previousGuesses.length > 0 && (
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
