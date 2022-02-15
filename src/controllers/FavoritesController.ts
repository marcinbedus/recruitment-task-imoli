import { Request, Response } from "express";
import ExcelService from "../services/ExcelService";
import FavoritesService from "../services/FavoritesService";
import SwapiService from "../services/SwapiService";
import { CustomError } from "../utils/errors/CustomError";
import { InternalServerError } from "../utils/errors/internalServerError";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { CreateFavoriteRequestBody } from "./FavoriteController";

class FavoritesController {
  async findAll(
    req: Request<{}, {}, {}, { name?: string; page?: string; count?: string }>,
    res: Response
  ) {
    try {
      const { name, page, count } = req.query;

      const favorites = await FavoritesService.findAll(name, page, count);
      const amountOfFavorites = await FavoritesService.count();

      return res
        .status(200)
        .json({ data: favorites, amount: amountOfFavorites });
    } catch (e: any) {
      if (e instanceof CustomError) throw e;

      throw new InternalServerError(e);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const favorites = await FavoritesService.find(id);

      if (!favorites) throw new NotFoundError();

      return res.status(200).json(favorites);
    } catch (e: any) {
      if (e instanceof CustomError) throw e;

      throw new InternalServerError(e);
    }
  }

  async create(req: Request<{}, {}, CreateFavoriteRequestBody>, res: Response) {
    try {
      const { body } = req;

      const filmsData = await SwapiService.getAllFilmsWithIds(body.ids);

      await FavoritesService.create(body.name, filmsData);

      return res.sendStatus(200);
    } catch (e: any) {
      if (e instanceof CustomError) throw e;

      throw new InternalServerError(e);
    }
  }

  async getFile(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const list = await FavoritesService.find(id);
      if (!list) throw new NotFoundError();

      const encodedData = ExcelService.getEncodedFile(list);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + `${list.name}.xlsx`
      );

      res.end(Buffer.from(encodedData, "base64"));
    } catch (e: any) {
      if (e instanceof CustomError) throw e;

      throw new InternalServerError(e);
    }
  }
}

export default new FavoritesController();
