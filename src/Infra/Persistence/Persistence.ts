import { AgendaRepository } from "../../App/Commands/Ports/AgendaRepository";
import { AgendaProjector } from "../../App/Queries/Ports/AgendaProjector";

export interface Persistence {
  reset(): Promise<void>;
  getAgendaRepository(): AgendaRepository;
  getAgendaProjector(): AgendaProjector;
}
