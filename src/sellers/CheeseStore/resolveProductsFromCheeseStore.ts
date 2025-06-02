import { LocaleOfSeller } from "../../config";
import {
  CheeseStoreLanguageTag,
  fetchProductsFromCheeseStore,
} from "./fetchProductsFromCheeseStore";
import { mapCheeseStoreProducts } from "./mapCheeseStoreProducts";

type LocaleOfCheeseStoreMarket = LocaleOfSeller<"Cheese Store">;

export const resolveProductsFromCheeseStore = (
  locale: LocaleOfCheeseStoreMarket
) => {
  const languageTag = cheeseStoreLangugageTagMap[locale];

  return fetchProductsFromCheeseStore(languageTag).then(mapCheeseStoreProducts);
};

const cheeseStoreLangugageTagMap: Record<
  LocaleOfCheeseStoreMarket,
  CheeseStoreLanguageTag
> = {
  "de-CH": "ger",
  "en-CH": "eng",
};
