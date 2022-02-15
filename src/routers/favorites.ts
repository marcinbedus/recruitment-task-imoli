import express from "express";
import use from "../utils/useCustomError";

import FavoritesController from "../controllers/FavoritesController";

const favoritesRouter = express.Router();

favoritesRouter
  .get("/", use(FavoritesController.findAll))
  .post("/", use(FavoritesController.create))
  .get("/:id", use(FavoritesController.findById))
  .get("/:id/file", use(FavoritesController.getFile));

export default favoritesRouter;
