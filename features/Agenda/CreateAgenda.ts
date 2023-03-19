import assert from "assert";
import { Given, When, Then, Before } from "@cucumber/cucumber";
import { CreateAgendaParameters } from "../../src/App/Commands/CreateAgenda";
import { CreateAgenda } from "../../src/App/Commands/CreateAgenda";
import { AgendaProjector } from "../../src/App/Queries/Ports/AgendaProjector";
import { AllAgendasOfUserProjection } from "../../src/App/Queries/Projections/AllAgendasOfUserProjection";
import { setupInMemoryPersistence } from "../Common/Persistence";
import { assertIsAnErrorWithMessage } from "../Common/TestTools";

Before(async function () {
  await setupInMemoryPersistence(this);
});

Given("an agenda's name", function () {
  this.agendaName = "MyAgenda";
});

Given("a user", function () {
  this.userId = "dummyUserId";
});

Given(
  "I have created an agenda with the agenda's name for that user",
  async function () {
    await createAgenda(this);
  }
);

When(
  "I create an agenda with the agenda's name for that user",
  async function () {
    try {
      await createAgenda(this);
    } catch (error: any) {
      this.lastError = error;
    }
  }
);

Then("the agenda should be part of that user's agendas", async function () {
  const projector: AgendaProjector = this.agendaProjector;
  const allAgendas: AllAgendasOfUserProjection =
    await projector.getAllAgendasOfUser(this.userId);
  assert.strictEqual(allAgendas.allAgendas.length, 1);
  assert.strictEqual(allAgendas.allAgendas[0].name, this.agendaName);
  assert.strictEqual(allAgendas.userId, this.userId);
});

Then(
  "I should be informed that an agenda with that name already exists for that user",
  function () {
    assertIsAnErrorWithMessage(
      this.lastError,
      `Agenda with name '${this.agendaName}' already exists for user '${this.userId}'.`
    );
  }
);

async function createAgenda(world: any): Promise<void> {
  const command = new CreateAgendaParameters(world.agendaName, world.userId);
  const handler = new CreateAgenda(world.agendaRepository);
  await handler.handle(command);
}
