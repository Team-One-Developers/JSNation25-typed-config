export type ConfigShape = {
  markets: Record<MarketKeyShape, MarketConfigShape>;
};

export type MarketKeyShape = string;

export type MarketConfigShape = {
  locales: string[];
  seller: string;
};
