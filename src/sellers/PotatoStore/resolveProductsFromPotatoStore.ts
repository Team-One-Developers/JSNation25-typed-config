import {
  fetchProductsFromPotatoStore,
  PotatoStoreLanguageTag,
} from "./fetchProductsFromPotatoStore";
import { mapPotatoStoreProducts } from "./mapPotatoStoreProducts";

export const resolveProductsFromPotatoStore = (locale: string) => {
  const languageTag = potatoStoreLangugageTagMap[locale];

  if (!languageTag) {
    throw new Error("Invalid locale");
  }

  return fetchProductsFromPotatoStore(languageTag).then(mapPotatoStoreProducts);
};

const potatoStoreLangugageTagMap: Record<string, PotatoStoreLanguageTag> = {
  "de-DE": "ger",
};
