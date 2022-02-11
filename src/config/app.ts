import express, { Application } from "express";

class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  private registerRouter = () => {};

  private config = () => {};
}

export default new App().app;
