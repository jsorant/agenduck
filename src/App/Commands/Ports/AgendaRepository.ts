import { Agenda } from "../../../Domain/Agenda/Agenda";

export interface AgendaRepository {
  hasAgendaWithNameAndUserId(name: string, userId: string): Promise<boolean>;
  save(agenda: Agenda): Promise<void>;
}
