import { CommandParameters } from "./CommandParameters";

export interface Command<TCommandParameters extends CommandParameters> {
  handle(parameters: TCommandParameters): Promise<void>;
}
