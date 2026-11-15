export type StoreKind = "file" | "memory";

type Env = { NODE_ENV?: string; WAITLIST_STORE?: string };

export function resolveStoreKind(env: Env): StoreKind {
  const explicit = env.WAITLIST_STORE;
  if (explicit === "file" || explicit === "memory") return explicit;
  if (explicit) throw new Error(`Unknown WAITLIST_STORE "${explicit}". Use "file" or "memory".`);
  return env.NODE_ENV === "production" ? "memory" : "file";
}
