import { AllAgendasOfUserProjection } from "../Projections/AllAgendasOfUserProjection";

export interface AgendaProjector {
  getAllAgendasOfUser(userId: string): Promise<AllAgendasOfUserProjection>;
}
