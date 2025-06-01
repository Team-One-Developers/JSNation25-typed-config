import { describe, expect, test, jest } from "@jest/globals";
import { fetchProducts } from "./fetchProducts";
import { resolveMarketConfig } from "../resolveMarketConfig";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";

jest.unmock("./fetchProducts");

describe("fetchProducts", () => {
  test("calls resolveProductsFromPotatoStore for Potato Store", async () => {
    jest
      .mocked(resolveMarketConfig)
      .mockResolvedValue({ seller: "Potato Store", locales: ["xx-XX"] });
    jest
      .mocked(resolveProductsFromPotatoStore)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    const result = await fetchProducts("de", "xx-XX");

    expect(resolveProductsFromPotatoStore).toHaveBeenCalledWith("xx-XX");
    expect(result).toEqual([{ name: "Yummy Potato", price: 1 }]);
  });

  test("calls resolveProductsFromCheeseStore for Cheese Store", async () => {
    jest
      .mocked(resolveMarketConfig)
      .mockResolvedValue({ seller: "Cheese Store", locales: ["xx-XX"] });
    jest
      .mocked(resolveProductsFromCheeseStore)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    const result = await fetchProducts("xx", "xx-XX");

    expect(resolveProductsFromCheeseStore).toHaveBeenCalledWith("xx-XX");
    expect(result).toEqual([{ name: "Yummy Potato", price: 1 }]);
  });
  test("throws if seller is unsupported", async () => {
    jest
      .mocked(resolveMarketConfig)
      .mockResolvedValue({ seller: "Unknown Seller", locales: ["xx-XX"] });

    await expect(fetchProducts("xx", "xx-XX")).rejects.toThrow(
      'Unsupported "Unknown Seller"'
    );
  });
});
