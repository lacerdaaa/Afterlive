"use server";

import { headers } from "next/headers";
import { getJoinDeps } from "@/lib/waitlist";
import { clientIpFrom, joinWaitlist, type JoinState } from "@/lib/waitlist/join";

export async function joinWaitlistAction(_prev: JoinState, formData: FormData): Promise<JoinState> {
  const input = { email: formData.get("email"), website: formData.get("website") ?? "" };
  return joinWaitlist(getJoinDeps(), input, clientIpFrom(await headers()));
}
