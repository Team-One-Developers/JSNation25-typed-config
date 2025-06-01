import { getMarketConfig, LocaleOfMarket, MarketKey } from "../config";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { Product } from "./Product";

export async function fetchProducts<M extends MarketKey>(
  marketKey: M,
  locale: LocaleOfMarket<M>
): Promise<Product[]> {
  const marketConfig = getMarketConfig(marketKey);

  if (marketConfig.seller === "Potato Store") {
    return resolveProductsFromPotatoStore(locale);
  }

  if (marketConfig.seller === "Cheese Store") {
    return resolveProductsFromCheeseStore(locale);
  }

  assertNever(marketConfig);
  return [];
}

function demo() {
  fetchProducts<"de" | "ch">("ch", "de-DE"); // no issue in ts!
}

function assertNever(_value: never) {}
