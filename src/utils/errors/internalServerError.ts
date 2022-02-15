import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public error: Error) {
    super("Internal server error");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.error.message }];
  }
}
