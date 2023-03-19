import { InMemoryPersistence } from "../../src/Infra/Persistence/InMemory/InMemoryPersistence";
import { Persistence } from "../../src/Infra/Persistence/Persistence";

export async function setupInMemoryPersistence(world: any): Promise<void> {
  const persistence: Persistence = await createInMemoryPersistence();
  await setupWorldWithPersistence(world, persistence);
}

async function setupWorldWithPersistence(
  world: any,
  persistence: Persistence
): Promise<void> {
  world.watchListsRepository = persistence.getWatchListsRepository();
  world.watchListProjections = persistence.getWatchListProjections();
}

async function createInMemoryPersistence(): Promise<Persistence> {
  const persistence: Persistence = new InMemoryPersistence();
  await persistence.reset();
  return persistence;
}
