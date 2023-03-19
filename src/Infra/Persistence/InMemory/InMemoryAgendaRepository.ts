import { SharedMemory } from "./SharedMemory";
import { AgendaRepository } from "../../../App/Commands/Ports/AgendaRepository";
import { Agenda } from "../../../Domain/Agenda/Agenda";

export class InMemoryAgendaRepository implements AgendaRepository {
  private sharedMemory: SharedMemory;

  constructor(sharedMemory: SharedMemory) {
    this.sharedMemory = sharedMemory;
  }

  async hasAgendaWithNameAndUserId(
    name: string,
    userId: string
  ): Promise<boolean> {
    return this.sharedMemory.hasAgendasWithNameAndUserId(name, userId);
  }

  async save(agenda: Agenda): Promise<void> {
    this.sharedMemory.removeAgendaWithName(agenda.name.value);
    this.sharedMemory.addAgenda(agenda);
  }
}
