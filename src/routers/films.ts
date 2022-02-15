import express from "express";
import FilmsController from "../controllers/FilmsController";
import use from "../utils/useCustomError";

const filmsRouter = express.Router();

filmsRouter.get("/", use(FilmsController.findAll));

export default filmsRouter;
