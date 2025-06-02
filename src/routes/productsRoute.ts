import { Request, Response } from "express";
import { fetchProducts } from "../sellers/fetchProducts";
import { isMarketKey } from "../config";

export async function productsRoute(req: Request, res: Response) {
  const marketKey = req.query.marketKey;
  const locale = req.query.locale;

  if (!isMarketKey(marketKey) || typeof locale !== "string") {
    res.status(400).send("Invalid query parameters");
    return;
  }

  try {
    const products = await fetchProducts({ marketKey, locale });

    res.json(products);
  } catch (_err) {
    res.status(500).send();
  }
}
