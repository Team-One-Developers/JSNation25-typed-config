import { describe, expect, test, jest } from "@jest/globals";
import { fetchProducts } from "./fetchProducts";
import { resolveProductsFromPotatoStore } from "./PotatoStore/resolveProductsFromPotatoStore";
import { resolveProductsFromCheeseStore } from "./CheeseStore/resolveProductsFromCheeseStore";
import { MarketKey } from "../config";
import { isMarketLocaleForSeller, MarketLocale } from "../MarketLocale";
import { fixture } from "../test-utils/fixture";

jest.unmock("./fetchProducts");
jest.unmock("../test-utils/fixture");
jest.unmock("deep-extend");

describe("fetchProducts", () => {
  test("calls resolveProductsFromPotatoStore for Potato Store", async () => {
    jest
      .mocked(resolveProductsFromPotatoStore)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    jest
      .mocked(isMarketLocaleForSeller)
      .mockImplementation((m, seller): m is never => seller === "Potato Store");

    const result = await fetchProducts(
      marketLocaleFixture({
        locale: localeFixture("xx-XX").use(),
      }).use()
    );

    expect(resolveProductsFromPotatoStore).toHaveBeenCalledWith("xx-XX");
    expect(result).toEqual([{ name: "Yummy Potato", price: 1 }]);
  });

  test("calls resolveProductsFromCheeseStore for Cheese Store", async () => {
    jest
      .mocked(resolveProductsFromCheeseStore)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    jest
      .mocked(isMarketLocaleForSeller)
      .mockImplementation((m, seller): m is never => seller === "Cheese Store");

    const result = await fetchProducts(
      marketLocaleFixture({
        locale: localeFixture("xx-XX").use(),
      }).use()
    );

    expect(resolveProductsFromCheeseStore).toHaveBeenCalledWith("xx-XX");
    expect(result).toEqual([{ name: "Yummy Potato", price: 1 }]);
  });
});

const marketKeyFixture = fixture.literal<MarketKey>("xx");
const localeFixture = fixture.literal<MarketLocale["locale"]>("xx-XX");

const marketLocaleFixture = fixture.object<MarketLocale>({
  marketKey: marketKeyFixture.use(),
  locale: localeFixture.use(),
});
