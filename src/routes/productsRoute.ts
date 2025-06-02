import { Request, Response } from "express";
import { fetchProducts } from "../sellers/fetchProducts";
import { assertMarketLocale } from "../MarketLocale";

export async function productsRoute(req: Request, res: Response) {
  const marketKey = req.query.marketKey;
  const locale = req.query.locale;
  const marketLocale = { marketKey, locale };

  try {
    assertMarketLocale(marketLocale);
  } catch (_err) {
    res.status(400).send("Invalid query parameters");
    return;
  }

  try {
    const products = await fetchProducts(marketLocale);

    res.json(products);
  } catch (_err) {
    res.status(500).send();
  }
}
