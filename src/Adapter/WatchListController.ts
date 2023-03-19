import { NextFunction, Request, Response } from "express";
import { AgendaRepository } from "../App/Commands/Ports/AgendaRepository";
import { CreateAgendaParameters } from "../App/Commands/CreateAgenda";
import { CreateAgenda } from "../App/Commands/CreateAgenda";
import { GetAllAgendasOfUser } from "../App/Queries/GetAgenda";
import { AgendaProjector } from "../App/Queries/Ports/AgendaProjector";
import { GetAllAgendasOfUser } from "../App/Queries/GetAllAgendasOfUser";
import { AllAgendasOfUserProjection } from "../App/Queries/Projections/AllAgendasOfUserProjection";

export class WatchListController {
  private watchListsRepository: AgendaRepository;
  private watchListProjections: AgendaProjector;

  constructor(
    watchListsRepository: AgendaRepository,
    watchListProjections: AgendaProjector
  ) {
    this.watchListsRepository = watchListsRepository;
    this.watchListProjections = watchListProjections;
  }

  async postTrackCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      //const id = req.params.id;
      const { watchlist, name } = req.body;

      const command: CreateAgendaParameters = new CreateAgendaParameters(
        watchlist,
        name
      );
      const handler: CreateAgenda = new CreateAgenda(this.watchListsRepository);
      await handler.handle(command);

      // Format response
      res.status(200);
      res.json({});
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const name: string = req.body.name;

      // Call use case
      const query: GetAllAgendasOfUser = new GetAllAgendasOfUser(name);
      const handler: GetAllAgendasOfUser = new GetAllAgendasOfUser(
        this.watchListProjections
      );
      const watchList: AllAgendasOfUserProjection = await handler.handle(query);

      // Format response
      res.status(200);
      res.json(watchList);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }
}
