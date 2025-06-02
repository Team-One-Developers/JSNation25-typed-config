import {
  config,
  LocaleOfMarket,
  MarketKey,
  MarketKeyOfSeller,
  Seller,
} from "./config";

export type MarketLocale<M extends MarketKey = MarketKey> = {
  [K in M]: { marketKey: K; locale: LocaleOfMarket<K> };
}[M];

export function isMarketLocaleForSeller<S extends Seller>(
  marketLocale: MarketLocale,
  seller: S
): marketLocale is MarketLocale<MarketKeyOfSeller<S>> {
  const marketConfig = config.markets[marketLocale.marketKey];
  return marketConfig.seller === seller;
}
