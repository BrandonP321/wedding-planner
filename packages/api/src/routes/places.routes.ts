import express from "express";
import {
  GetAddressSuggestionsController,
  getCitySuggestionsController,
} from "../controllers/places";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";
import { GetAddressDetailsController } from "../controllers/places/getAddressDetails.controller";

const router = express.Router();

router.post(APIRoute.Places.GetCitySuggestions, getCitySuggestionsController);
router.post(
  APIRoute.Places.GetAddressSuggestions,
  GetAddressSuggestionsController
);
router.post(APIRoute.Places.GetAddressDetails, GetAddressDetailsController);

export const placesRouter = router;
