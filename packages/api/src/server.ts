import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { createServer } from "http";
import { initModels, syncWithDB } from "./models";
import { createAssociations } from "./models/associations";
import { configureDefaultMiddleware } from "./middleware";
import { configureRoutes } from "./routes";

import { StringSchema, addMethod, string } from "yup";

addMethod(StringSchema, "myTest", function () {
  return this.email();
});

string().myTest;

const PORT = process.env.PORT ?? 8000;

export const app = express();
const httpServer = createServer(app);

// MIDDLEWARE
configureDefaultMiddleware(app);

// ROUTES
configureRoutes(app);

// Health check endpoint
app.get("/health-check", (req, res) => {
  res.json({}).end();
});

// DB CONNECTION
initModels();
createAssociations();
syncWithDB();

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
