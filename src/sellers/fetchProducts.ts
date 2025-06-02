import { isMarketLocaleForSeller, MarketLocale } from "../MarketLocale";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { Product } from "./Product";

export async function fetchProducts(
  marketLocale: MarketLocale
): Promise<Product[]> {
  if (isMarketLocaleForSeller(marketLocale, "Potato Store")) {
    return resolveProductsFromPotatoStore(marketLocale.locale);
  }

  if (isMarketLocaleForSeller(marketLocale, "Cheese Store")) {
    return resolveProductsFromCheeseStore(marketLocale.locale);
  }

  assertNever(marketLocale);
  return [];
}

function assertNever(_value: never) {}
