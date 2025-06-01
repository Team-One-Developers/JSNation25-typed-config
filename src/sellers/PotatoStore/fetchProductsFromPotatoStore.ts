export async function fetchProductsFromPotatoStore(
  languageTag: PotatoStoreLanguageTag
) {
  return fetch(
    "https://potatoes.plepp.eu/api/products?languageTag=" + languageTag
  ).then((res) => res.json() as Promise<PotatoStoreProducts>);
}

export type PotatoStoreLanguageTag = "ger" | "eng" | "fre";
export type PotatoStoreProducts = [{ title: string; price: string }];
