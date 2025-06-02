import {
  config,
  LocaleOfMarket,
  MarketKey,
  MarketKeyOfSeller,
  Seller,
} from "./config";

// export type MarketLocaleSimple =
//   | { marketKey: "de"; locale: "de-DE" }
//   | { marketKey: "ch"; locale: "de-CH" | "en-CH" };

export type MarketLocale<M extends MarketKey = MarketKey> = {
  [K in M]: { marketKey: K; locale: LocaleOfMarket<K> };
}[M];

// type MarketLocaleMap = {
//     de: { marketKey: "de"; locale: "de-DE" }
//     ch: { marketKey: "ch"; locale: "de-CH" | "en-CH" }
// }

// type MarketLocaleFromMap<M extends MarketKey = MarketKey> = MarketLocaleMap[M]

export function isMarketLocaleForSeller<S extends Seller>(
  marketLocale: MarketLocale,
  seller: S
): marketLocale is MarketLocale<MarketKeyOfSeller<S>> {
  const marketConfig = config.markets[marketLocale.marketKey];
  return marketConfig.seller === seller;
}
