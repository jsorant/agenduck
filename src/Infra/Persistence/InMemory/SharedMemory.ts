import { Agenda } from "../../../Domain/Agenda/Agenda";

export class SharedMemory {
  private agendas: Array<Agenda> = [];

  reset() {
    this.agendas = [];
  }

  // Helpers:

  findAgendasWithUserId(userId: string): Array<Agenda> {
    return this.agendas.filter((agenda) => agenda.userId.value === userId);
  }

  hasAgendasWithNameAndUserId(name: string, userId: string): boolean {
    return this.agendas.some(
      (agenda) => agenda.userId.value === userId && agenda.name.value === name
    );
  }

  removeAgendaWithName(name: string): void {
    this.agendas = this.agendas.filter(
      (agenda: Agenda) => agenda.name.value !== name
    );
  }

  addAgenda(agenda: Agenda) {
    this.agendas.push(agenda);
  }
}
