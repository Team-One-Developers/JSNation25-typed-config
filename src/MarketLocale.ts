import {
  config,
  getMarketConfig,
  isMarketKey,
  LocaleOfMarket,
  MarketKey,
  MarketKeyOfSeller,
  Seller,
} from "./config";

export type MarketLocale<M extends MarketKey = MarketKey> = {
  [K in M]: { marketKey: K; locale: LocaleOfMarket<K> };
}[M];

export function assertMarketLocale(marketLocale: {
  marketKey: unknown;
  locale: unknown;
}): asserts marketLocale is MarketLocale {
  if (!isMarketKey(marketLocale.marketKey)) {
    throw new Error(`Invalid market key: ${marketLocale.marketKey}`);
  }

  const marketConfig = getMarketConfig(marketLocale.marketKey);
  const validLocales: string[] = marketConfig.locales;

  if (
    typeof marketLocale.locale !== "string" ||
    !validLocales.includes(marketLocale.locale)
  ) {
    throw new Error(
      `Invalid locale for market ${marketLocale.marketKey}: ${marketLocale.locale}`
    );
  }
}

export function isMarketLocaleForSeller<S extends Seller>(
  marketLocale: MarketLocale,
  seller: S
): marketLocale is MarketLocale<MarketKeyOfSeller<S>> {
  const marketConfig = config.markets[marketLocale.marketKey];
  return marketConfig.seller === seller;
}
