import { Request, Response } from "express";
import SwapiService from "../services/SwapiService";
import { CustomError } from "../utils/errors/CustomError";
import { InternalServerError } from "../utils/errors/internalServerError";

class FilmsController {
  async findAll(req: Request, res: Response) {
    try {
      const {
        data: { results },
      } = await SwapiService.getAllFilms();

      const filmsToSend = results.map(
        ({ title, episode_id, release_date }) => ({
          title,
          episode_id,
          release_date,
        })
      );

      return res.status(200).send(filmsToSend);
    } catch (e: any) {
      if (e instanceof CustomError) throw e;

      throw new InternalServerError(e);
    }
  }
}

export default new FilmsController();
