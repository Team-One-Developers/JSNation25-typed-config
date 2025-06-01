import { describe, expect, test, jest } from "@jest/globals";
import { fetchProducts } from "./fetchProducts";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";
import { getMarketConfig, MarketKey } from "../config";

jest.unmock("./fetchProducts");

describe("fetchProducts", () => {
  test("calls resolveProductsFromPotatoStore for Potato Store", async () => {
    jest
      .mocked(getMarketConfig)
      .mockReturnValue({ seller: "Potato Store", locales: ["xx-XX"] });
    jest
      .mocked(resolveProductsFromPotatoStore)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    const result = await fetchProducts("xx" as unknown as MarketKey, "xx-XX");

    expect(resolveProductsFromPotatoStore).toHaveBeenCalledWith("xx-XX");
    expect(result).toEqual([{ name: "Yummy Potato", price: 1 }]);
  });

  test("calls resolveProductsFromCheeseStore for Cheese Store", async () => {
    jest
      .mocked(getMarketConfig)
      .mockReturnValue({ seller: "Cheese Store", locales: ["xx-XX"] });
    jest
      .mocked(resolveProductsFromCheeseStore)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    const result = await fetchProducts("xx" as unknown as MarketKey, "xx-XX");

    expect(resolveProductsFromCheeseStore).toHaveBeenCalledWith("xx-XX");
    expect(result).toEqual([{ name: "Yummy Potato", price: 1 }]);
  });
  test("throws if seller is unsupported", async () => {
    jest
      .mocked(getMarketConfig)
      .mockReturnValue({ seller: "Unknown Seller", locales: ["xx-XX"] });

    await expect(
      fetchProducts("xx" as unknown as MarketKey, "xx-XX")
    ).rejects.toThrow('Unsupported "Unknown Seller"');
  });
});
