import express, { Router } from "express";
import compression from "compression";
import cors from "cors";

interface Options {
  port: number;
}

export class Server {
  private app = express();
  private readonly port: number;

  constructor(options: Options) {
    const { port } = options;
    this.port = port;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(
      cors({
        origin: "*",
      })
    );

    //* Routes
    // this.app.use(this.routes);

    // * Db
    // this.dbClient.execute();

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
