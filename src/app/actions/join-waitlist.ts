"use server";

import { headers } from "next/headers";
import { getJoinDeps } from "@/lib/waitlist";
import { clientIpFrom, joinWaitlist, type JoinState } from "@/lib/waitlist/join";

export async function joinWaitlistAction(_prev: JoinState, formData: FormData): Promise<JoinState> {
  const input = { email: formData.get("email"), website: formData.get("website") ?? "" };
  const result = await joinWaitlist(getJoinDeps(), input, clientIpFrom(await headers()));
  // React resets the form after an action; hand the typed email back so nobody retypes it.
  return result.status === "error" && typeof input.email === "string" ? { ...result, email: input.email } : result;
}
