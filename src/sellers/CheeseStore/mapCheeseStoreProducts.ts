import { Product } from "../Product";
import { CheeseStoreProducts } from "./fetchProductsFromCheeseStore";

export const mapCheeseStoreProducts = (
  products: CheeseStoreProducts
): Product[] => {
  return products.map((product) => ({
    name: product.title,
    price: Number(product.price),
  }));
};
