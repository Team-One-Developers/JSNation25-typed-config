import { LocaleOfSeller } from "../../config";
import {
  fetchProductsFromPotatoStore,
  PotatoStoreLanguageTag,
} from "./fetchProductsFromPotatoStore";
import { mapPotatoStoreProducts } from "./mapPotatoStoreProducts";

type LocaleOfPotatoStoreMarket = LocaleOfSeller<"Potato Store">;

export const resolveProductsFromPotatoStore = (
  locale: LocaleOfPotatoStoreMarket
) => {
  const languageTag = potatoStoreLangugageTagMap[locale];

  return fetchProductsFromPotatoStore(languageTag).then(mapPotatoStoreProducts);
};

const potatoStoreLangugageTagMap: Record<
  LocaleOfPotatoStoreMarket,
  PotatoStoreLanguageTag
> = {
  "de-DE": "ger",
};
