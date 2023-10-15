import { Express } from "express";
import { placesRouter } from "./places.routes";

export const configureRoutes = (app: Express) => {
  app.use(placesRouter);
};
