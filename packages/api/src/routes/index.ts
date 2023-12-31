import { Express } from "express";
import { placesRouter } from "./places.routes";
import { vendorRouter } from "./vendor.routes";
import { s3Router } from "./s3.routes";
import { vendorAuthRouter } from "./vendorAuth.routes";

export const configureRoutes = (app: Express) => {
  app.use(placesRouter);
  app.use(vendorRouter);
  app.use(s3Router);
  app.use(vendorAuthRouter);
};
