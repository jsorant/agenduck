import { CommandParameters } from "../CqrsModel/CommandParameters";
import { Command } from "../CqrsModel/Command";
import { AgendaRepository } from "./Ports/AgendaRepository";
import { Agenda } from "../../Domain/Agenda/Agenda";

export class CreateAgendaParameters implements CommandParameters {
  readonly name: string;
  readonly userId: string;

  constructor(name: string, userId: string) {
    this.name = name;
    this.userId = userId;
  }
}

export class CreateAgenda implements Command<CreateAgendaParameters> {
  private repository: AgendaRepository;

  constructor(repository: AgendaRepository) {
    this.repository = repository;
  }

  async handle(parameters: CreateAgendaParameters): Promise<void> {
    await this.ensureAgendaDoesNotAlreadyExist(parameters);
    const agenda = Agenda.createNew(parameters.name, parameters.userId);
    this.repository.save(agenda);
  }

  private async ensureAgendaDoesNotAlreadyExist(
    parameters: CreateAgendaParameters
  ) {
    if (
      await this.repository.hasAgendaWithNameAndUserId(
        parameters.name,
        parameters.userId
      )
    ) {
      throw new Error(
        `Agenda with name '${parameters.name}' already exists for user '${parameters.userId}'.`
      );
    }
  }
}
