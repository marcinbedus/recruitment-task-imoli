import express, { Application } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import favoritesRouter from "../routers/favorites";
import filmsRouter from "../routers/films";
import { NotFoundError } from "../utils/errors/NotFoundError";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.config();
    this.registerRoutes();
  }

  private config = () => {
    this.app.use(express.json());
  };

  private registerRoutes = () => {
    this.app.use("/favorites", favoritesRouter);
    this.app.use("/films", filmsRouter);

    this.app.all("*", (req, res) => {
      throw new NotFoundError();
    });

    this.app.use(errorHandler);
  };
}

export default new App().app;
