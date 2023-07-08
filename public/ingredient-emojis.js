const ingredientEmojis = {
  meat: "🍖",
  seafood: "🍤",
  tofu: "🍲",
  butter: "🧈",
  onions: "🧅",
  garlic: "🧄",
  tomatoes: "🍅",
  potatoes: "🥔",
  carrots: "🥕",
  rice: "🍚",
  pasta: "🍝",
  dough: "🍞",
  cheese: "🧀",
  dairy: "🥛",
  eggs: "🥚",
  citrus: "🍋",
  herbs: "🌿",
  spices: "🌶",
  soySauce: "🥡",
  sweeteners: "🍯",
  vinegar: "🍶",
  coconutMilk: "🥥",
  mushrooms: "🍄",
  chocolate: "🍫",
  veggies: "🥦",
  peppers: "🫑",
  nuts: "🥜",
  beans: "🥫",
  corn: "🌽",
  cucumbers: "🥒",
  apples: "🍎",
  berries: "🍓",
  leafyGreens: "🥬",
  olives: "🫒",
  pickles: "🥒",
  wine: "🍷",
};

const getEmoji = (ingredient) => {
  return ingredientEmojis[ingredient] || "❓";
};

export default getEmoji;
