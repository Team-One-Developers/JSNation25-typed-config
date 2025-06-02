import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import { productsRoute } from "./productsRoute";
import { Request, Response } from "express";
import { fetchProducts } from "../sellers/fetchProducts";
import { assertMarketLocale } from "../MarketLocale";

jest.unmock("./productsRoute");

const validMockRequest = {
  query: { marketKey: "xx", locale: "xx-XX" },
} as unknown as Request;

const mockResponse = {
  json: jest.fn(),
  status: jest.fn(),
  send: jest.fn(),
} as unknown as Response;

describe("productsRoute", () => {
  beforeEach(() => {
    jest.mocked(mockResponse.status).mockReturnValue(mockResponse);
  });

  test("returns products for valid query parameters", async () => {
    jest
      .mocked(fetchProducts)
      .mockResolvedValue([{ name: "Yummy Potato", price: 1 }]);

    await productsRoute(validMockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith([
      { name: "Yummy Potato", price: 1 },
    ]);
  });

  test("returns 400 for invalid query parameters", async () => {
    jest.mocked(assertMarketLocale).mockImplementation(() => {
      throw new Error("Mocked error");
    });

    await productsRoute(validMockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith("Invalid query parameters");
  });
});
