import { List } from "antd";
import IngredientCard from "./IngredientCard";
import foods from "@/public/foods";

export default function Guess(props) {
  const { name, target } = props;
  const ingredients = foods
    .find((food) => food.name === name)
    .ingredients.sort();

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h3 style={{ marginBottom: 8 }}>{name}</h3>
      {
        <List
          itemLayout="horizontal"
          grid={{ gutter: 8, column: 5 }}
          style={{ width: "100%" }}
          dataSource={ingredients}
          renderItem={(item, index) => (
            <List.Item>
              {
                <IngredientCard
                  name={item}
                  correct={target.ingredients.includes(item)}
                />
              }
            </List.Item>
          )}
        />
      }
    </div>
  );
}
