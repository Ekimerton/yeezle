import moment from "moment-timezone";
import seedrandom from "seedrandom";

// Function to generate a random number based on the current date
export function generateUniqueNumber(n) {
  const now = moment().tz("America/New_York");
  const seed = now.format("DD-MM-YYYY");
  const rng = seedrandom(seed);
  const uniqueNumber = Math.floor(rng() * (Number(n) + 1));
  return uniqueNumber;
}

export function generateShareableString(previousGuesses, target) {
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
