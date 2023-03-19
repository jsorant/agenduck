import { AgendaRepository as AgendaRepository } from "../../../App/Commands/Ports/AgendaRepository";
import { AgendaProjector } from "../../../App/Queries/Ports/AgendaProjector";
import { Persistence } from "../Persistence";
import { InMemoryAgendaProjector } from "./InMemoryAgendaProjector";
import { InMemoryAgendaRepository } from "./InMemoryAgendaRepository";
import { SharedMemory } from "./SharedMemory";

export class InMemoryPersistence implements Persistence {
  private sharedMemory: SharedMemory = new SharedMemory();

  async reset(): Promise<void> {
    this.sharedMemory.reset();
  }

  getAgendaRepository(): AgendaRepository {
    return new InMemoryAgendaRepository(this.sharedMemory);
  }

  getAgendaProjector(): AgendaProjector {
    return new InMemoryAgendaProjector(this.sharedMemory);
  }
}
