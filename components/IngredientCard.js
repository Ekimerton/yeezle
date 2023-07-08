import "./IngredientCard.css";
import getEmoji from "@/public/ingredient-emojis";

export default function IngredientCard(props) {
  const { name, correct } = props;

  // Function to turn camelcase into capitalised words
  const camelToWords = (camelCase) =>
    camelCase
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());

  return (
    <div className="card-container">
      <div
        className="card"
        style={{
          borderColor: correct ? "green" : "grey",
          background: correct ? "lightgreen" : "lightgrey",
        }}
      >
        <p className="ingredient-emoji">{getEmoji(name)}</p>
      </div>
      <p className="ingredient-name">{camelToWords(name)}</p>
    </div>
  );
}
