import bodyParser from "body-parser";
import express from "express";
import { WatchListController } from "../../Adapter/WatchListController";
import { AgendaRepository } from "../../App/Commands/Ports/AgendaRepository";
import { AgendaProjector } from "../../App/Queries/Ports/AgendaProjector";
import { InMemoryAgendaProjector } from "../Persistence/InMemory/InMemoryAgendaProjector";
import { InMemoryAgendaRepository } from "../Persistence/InMemory/InMemoryAgendaRepository";
import { SharedMemory } from "../Persistence/InMemory/SharedMemory";
import { ErrorHandler } from "./ErrorHandler";
import { makeWatchListRouter } from "./Routes/WatchListRouter";

export class Application {
  private expressApplication: express.Application;

  constructor() {
    this.expressApplication = express();

    // load middlewares
    this.expressApplication.use(bodyParser.urlencoded({ extended: true }));
    this.expressApplication.use(bodyParser.json());

    // load routes
    // TODO DI
    const sm: SharedMemory = new SharedMemory();
    const repo: AgendaRepository = new InMemoryAgendaRepository(sm);
    const projs: AgendaProjector = new InMemoryAgendaProjector(sm);
    const controller: WatchListController = new WatchListController(
      repo,
      projs
    );
    const watchListRouter = makeWatchListRouter(controller);
    this.expressApplication.use("/", watchListRouter);

    // generic error handler
    this.expressApplication.use(ErrorHandler);
  }

  start(port: number): void {
    this.expressApplication.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  }

  getExpressApplication(): express.Application {
    return this.expressApplication;
  }
}
