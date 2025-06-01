import express from "express";
import { productsRoute } from "./routes/productsRoute";

const app = express();

app.get("/products", productsRoute);
