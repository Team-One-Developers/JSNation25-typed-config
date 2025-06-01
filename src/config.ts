export const config: Config = {
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
};

export const getMarketConfig = (marketKey: MarketKey) =>
  config.markets[marketKey];

export const isMarketKey = (marketKey: unknown): marketKey is MarketKey => {
  return (
    typeof marketKey === "string" &&
    Object.keys(config.markets).includes(marketKey)
  );
};

export type Config = {
  markets: Record<MarketKey, MarketConfig>;
};

export type MarketKey = "de" | "ch";

export type MarketConfig = {
  locales: string[];
  seller: string;
};
