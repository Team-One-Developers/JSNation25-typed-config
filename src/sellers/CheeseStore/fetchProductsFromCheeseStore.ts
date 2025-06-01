export async function fetchProductsFromCheeseStore(
  languageTag: CheeseStoreLanguageTag
) {
  return fetch(
    "https://cheese.plepp.eu/api/products?languageTag=" + languageTag
  ).then((res) => res.json() as Promise<CheeseStoreProducts>);
}

export type CheeseStoreLanguageTag = "ger" | "eng" | "fre";
export type CheeseStoreProducts = [{ title: string; price: string }];
