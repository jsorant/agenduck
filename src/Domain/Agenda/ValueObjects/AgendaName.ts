import { ValueObject } from "../../DddModel/ValueObject";

export class AgendaName extends ValueObject {
  public readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
    Object.freeze(this);
  }
}
