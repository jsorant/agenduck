import { QueryParameters } from "../CqrsModel/Query";
import { Query } from "../CqrsModel/QueryHandler";
import { AgendaProjector } from "./Ports/AgendaProjector";
import { AllAgendasOfUserProjection } from "./Projections/AllAgendasOfUserProjection";

export class GetAllAgendasOfUserParameters implements QueryParameters {
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

export class GetAllAgendasOfUser
  implements Query<GetAllAgendasOfUserParameters, AllAgendasOfUserProjection>
{
  private projector: AgendaProjector;

  constructor(projector: AgendaProjector) {
    this.projector = projector;
  }

  async handle(
    parameters: GetAllAgendasOfUserParameters
  ): Promise<AllAgendasOfUserProjection> {
    return await this.projector.getAllAgendasOfUser(parameters.userId);
  }
}
