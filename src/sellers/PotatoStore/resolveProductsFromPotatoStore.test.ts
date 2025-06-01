import { describe, expect, jest, test } from "@jest/globals";
import { resolveProductsFromPotatoStore } from "./resolveProductsFromPotatoStore";
import { fetchProductsFromPotatoStore } from "./fetchProductsFromPotatoStore";

jest.unmock("./resolveProductsFromPotatoStore");

describe("fetchProductsFromPotatoStore", () => {
  test.each([{ locale: "de-DE", expectedTag: "ger" }] as const)(
    'maps "$locale" to "$expectedTag"',
    async ({ locale, expectedTag }) => {
      jest
        .mocked(fetchProductsFromPotatoStore)
        .mockResolvedValue([{ title: "Yummy Potato", price: "1" }]);

      await resolveProductsFromPotatoStore(locale);

      expect(fetchProductsFromPotatoStore).toHaveBeenCalledWith(expectedTag);
    }
  );
});
