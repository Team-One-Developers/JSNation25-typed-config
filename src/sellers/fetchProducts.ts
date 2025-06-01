import { getMarketConfig, MarketKey } from "../config";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { Product } from "./Product";

export async function fetchProducts(
  marketKey: MarketKey,
  locale: string
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

function assertNever(_value: never) {}
