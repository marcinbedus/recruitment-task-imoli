import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express";
import core from "express-serve-static-core";

const use =
  <T extends core.ParamsDictionary>(fn: RequestHandler<T>) =>
  (req: Request<T>, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default use;
