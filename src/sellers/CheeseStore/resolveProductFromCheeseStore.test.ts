import { describe, expect, jest, test } from "@jest/globals";
import { resolveProductsFromCheeseStore } from "./resolveProductsFromCheeseStore";
import { fetchProductsFromCheeseStore } from "./fetchProductsFromCheeseStore";
import { mapCheeseStoreProducts } from "./mapCheeseStoreProducts";

jest.unmock("./resolveProductsFromCheeseStore");

describe("fetchProductsFromCheeseStore", () => {
  test("throws an error for invalid locale", () => {
    expect(() => resolveProductsFromCheeseStore("invalid-locale")).toThrow(
      "Invalid locale"
    );
  });

  test.each([
    { locale: "de-CH", expectedTag: "ger" },
    { locale: "en-CH", expectedTag: "eng" },
  ] as const)(
    'maps "$locale" to "$expectedTag"',
    async ({ locale, expectedTag }) => {
      jest
        .mocked(fetchProductsFromCheeseStore)
        .mockResolvedValue([{ title: "Yummy Cheese", price: "1" }]);

      await resolveProductsFromCheeseStore(locale);

      expect(fetchProductsFromCheeseStore).toHaveBeenCalledWith(expectedTag);
    }
  );

  test("resolves mapped products", async () => {
    jest
      .mocked(fetchProductsFromCheeseStore)
      .mockResolvedValue([{ title: "Yummy Cheese", price: "1" }]);

    jest
      .mocked(mapCheeseStoreProducts)
      .mockReturnValue([{ name: "Yummy Cheese", price: 1 }]);

    const result = await resolveProductsFromCheeseStore("de-CH");

    expect(mapCheeseStoreProducts).toHaveBeenCalledWith([
      { title: "Yummy Cheese", price: "1" },
    ]);
    expect(result).toEqual([{ name: "Yummy Cheese", price: 1 }]);
  });
});
