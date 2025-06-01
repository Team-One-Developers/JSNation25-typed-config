import { Product } from "../Product";
import { PotatoStoreProducts } from "./fetchProductsFromPotatoStore";

export const mapPotatoStoreProducts = (
  products: PotatoStoreProducts
): Product[] => {
  return products.map((product) => ({
    name: product.title,
    price: Number(product.price),
  }));
};
