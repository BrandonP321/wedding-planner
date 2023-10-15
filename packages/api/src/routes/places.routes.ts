import express from "express";
import { getCitySuggestionsController } from "../controllers/places";
import { APIRoute } from "@wedding-planner/shared/common/api/routes";

const router = express.Router();

router.post(APIRoute.Places.GetCitySuggestions, getCitySuggestionsController);

export const placesRouter = router;
