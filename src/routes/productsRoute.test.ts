import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import { productsRoute } from "./productsRoute";
import { Request, Response } from "express";
import { fetchProducts } from "../sellers/fetchProducts";

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

  test("returns 400 for missing query parameters", async () => {
    const invalidMockRequest = {
      query: { marketKey: "xx" }, // Missing locale
    } as unknown as Request;

    await productsRoute(invalidMockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith("Invalid query parameters");
  });
});
