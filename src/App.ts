import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { resolve } from "path";

import sequelize from "./database";
import route from "./routes";

dotenv.config();

class App {
  public app: express.Application;
  private databaseConnection: any;

  constructor() {
    this.app = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, "..", "public")));
    this.app.enable("trust proxy");
  }

  private database(): void {
    this.databaseConnection = sequelize;
  }

  private routes(): void {
    this.app.use("/api", route);
  }
}

export default new App().app;
