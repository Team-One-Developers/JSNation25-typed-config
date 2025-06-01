import { MarketConfig } from "./config";

export async function resolveMarketConfig(
  marketKey: string
): Promise<MarketConfig | null> {
  const res = await fetch(`https://plepp.eu/config/markets/${marketKey}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch market config: " + res.statusText);
  }

  return res.json() as Promise<MarketConfig>;
}
