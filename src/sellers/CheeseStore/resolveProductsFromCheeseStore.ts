import {
  CheeseStoreLanguageTag,
  fetchProductsFromCheeseStore,
} from "./fetchProductsFromCheeseStore";
import { mapCheeseStoreProducts } from "./mapCheeseStoreProducts";

export const resolveProductsFromCheeseStore = (locale: string) => {
  const languageTag = cheeseStoreLangugageTagMap[locale];

  if (!languageTag) {
    throw new Error("Invalid locale");
  }

  return fetchProductsFromCheeseStore(languageTag).then(mapCheeseStoreProducts);
};

const cheeseStoreLangugageTagMap: Record<string, CheeseStoreLanguageTag> = {
  "de-CH": "ger",
};
