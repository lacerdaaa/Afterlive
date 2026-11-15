import { describeWaitlistRepository } from "./repository.contract";
import { MemoryWaitlistRepository } from "./memory-repository";

describeWaitlistRepository("MemoryWaitlistRepository", () => new MemoryWaitlistRepository());
