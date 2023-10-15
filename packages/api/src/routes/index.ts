import { Express } from "express";
import { placesRouter } from "./places.routes";
import { vendorRouter } from "./vendor.routes";

export const configureRoutes = (app: Express) => {
  app.use(placesRouter);
  app.use(vendorRouter);
};
