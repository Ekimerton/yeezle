import React from "react";
import { Combobox } from "@headlessui/react";

import "./FoodCombobox.css";

const FoodCombobox = ({
  foods,
  selectedFood,
  onSubmit,
  setQuery,
  query,
  gameOver,
}) => {
  const filteredFoods =
    query === ""
      ? foods
      : foods.filter((food) =>
          food.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selectedFood}
      onChange={onSubmit}
      disabled={gameOver}
      className="combobox-container"
    >
      <div className="combobox-wrapper">
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className="combobox-input"
          placeholder={"Apple Pie"}
        />
        <div className="combobox-options-wrapper">
          <Combobox.Options className="combobox-options">
            {filteredFoods.length === 0 && query !== "" ? (
              <div>Nothing found.</div>
            ) : (
              filteredFoods
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((food) => (
                  <Combobox.Option
                    key={food.id}
                    value={food}
                    className={({ active }) =>
                      `combobox-option ${
                        active ? "combobox-option--active" : ""
                      }`
                    }
                  >
                    {food.name}
                  </Combobox.Option>
                ))
            )}
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  );
};

export default FoodCombobox;
