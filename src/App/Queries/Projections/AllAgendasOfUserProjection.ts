export interface AllAgendasOfUserProjection {
  readonly userId: string;
  readonly allAgendas: Array<AgendaProjection>;
}

export interface AgendaProjection {
  readonly name: string;
}
