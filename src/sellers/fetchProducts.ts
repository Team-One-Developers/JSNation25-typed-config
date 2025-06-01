import { resolveMarketConfig } from "../resolveMarketConfig";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { Product } from "./Product";

export async function fetchProducts(
  marketKey: string,
  locale: string
): Promise<Product[]> {
  const marketConfig = await resolveMarketConfig(marketKey);

  if (marketConfig.seller === "Potato Store") {
    return resolveProductsFromPotatoStore(locale);
  }

  if (marketConfig.seller === "Cheese Store") {
    return resolveProductsFromCheeseStore(locale);
  }

  throw new Error(`Unsupported "${marketConfig.seller}"`);
}
