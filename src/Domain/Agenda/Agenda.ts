import { RootAggregate } from "../DddModel/RootAggregate";
import { AgendaId } from "./ValueObjects/AgendaId";
import { AgendaName } from "./ValueObjects/AgendaName";
import { UserId } from "./ValueObjects/UserId";

export class Agenda extends RootAggregate<AgendaId> {
  public readonly name: AgendaName;
  public readonly userId: UserId;

  private constructor(id: AgendaId, name: AgendaName, userId: UserId) {
    super(id);
    this.name = name;
    this.userId = userId;
  }

  static createNew(name: string, userId: string): Agenda {
    return new Agenda(
      AgendaId.createNew(),
      new AgendaName(name),
      new UserId(userId)
    );
  }

  static createFrom(id: string, name: string, userId: string): Agenda {
    return new Agenda(
      AgendaId.createFrom(id),
      new AgendaName(name),
      new UserId(userId)
    );
  }
}
