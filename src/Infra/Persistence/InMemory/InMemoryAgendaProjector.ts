import { AgendaProjector } from "../../../App/Queries/Ports/AgendaProjector";
import {
  AgendaProjection,
  AllAgendasOfUserProjection,
} from "../../../App/Queries/Projections/AllAgendasOfUserProjection";
import { Agenda } from "../../../Domain/Agenda/Agenda";
import { SharedMemory } from "./SharedMemory";

export class InMemoryAgendaProjector implements AgendaProjector {
  private sharedMemory: SharedMemory;

  constructor(sharedMemory: SharedMemory) {
    this.sharedMemory = sharedMemory;
  }

  async getAllAgendasOfUser(
    userId: string
  ): Promise<AllAgendasOfUserProjection> {
    const agendas = this.sharedMemory.findAgendasWithUserId(userId);
    return this.adaptAllAgendas(agendas, userId);
  }

  private adaptAllAgendas(
    agenda: Array<Agenda>,
    userId: string
  ): AllAgendasOfUserProjection {
    return {
      userId,
      allAgendas: this.adaptEveryAgenda(agenda),
    };
  }

  private adaptEveryAgenda(agendas: Array<Agenda>): Array<AgendaProjection> {
    return agendas.map(this.adaptAgenda);
  }

  private adaptAgenda(agenda: Agenda): AgendaProjection {
    return {
      name: agenda.name.value,
    };
  }
}
