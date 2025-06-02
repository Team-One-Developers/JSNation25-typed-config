import { ConfigShape } from "./ConfigShape";

export const config = {
  markets: {
    de: {
      locales: ["de-DE"],
      seller: "Potato Store",
    },
    ch: {
      locales: ["de-CH", "en-CH"],
      seller: "Cheese Store",
    },
  },
} as const satisfies ConfigShape;

export const getMarketConfig = (marketKey: MarketKey) =>
  config.markets[marketKey];

export const isMarketKey = (marketKey: unknown): marketKey is MarketKey => {
  return (
    typeof marketKey === "string" &&
    Object.keys(config.markets).includes(marketKey)
  );
};

export type Config = typeof config;

export type MarketsConfig = Config["markets"];
export type MarketConfig = MarketsConfig[MarketKey];
export type MarketKey = keyof MarketsConfig;
export type Seller = MarketConfig["seller"];

export type MarketConfigOfSeller<S extends Seller> = MarketConfig & {
  seller: S;
};

export type LocaleOfSeller<S extends Seller> =
  MarketConfigOfSeller<S>["locales"][number];
