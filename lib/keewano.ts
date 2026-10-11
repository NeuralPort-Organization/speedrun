import "server-only";

// Owner: T4. T1 stub so every track can import emit() from day one.
// Contract (PLAN §6a): emit(personId, eventId, value). Batches, NEVER throws.
// Use the EV constants below; never retype a numeric id.

export const EV = {
  checked_in: 2000,
  profile_role: 2001,
  profile_source: 2002,
  intake_call_seconds: 2003,
  match_proposed: 2004,
  match_score: 2005,
  intro_proposed: 2006,
  intro_accepted: 2007,
  intro_declined: 2008,
  human_intro_made: 2009,
  met_scan: 2010,
  rating_given: 2011,
  rating_received: 2012,
  give_credit_milli: 2013,
  take_debit_milli: 2014,
  minutes_to_first_valuable_meeting: 2015,
  need_unmet: 2016,
  darwin_agent_matched: 2017,
  briefing_call_result: 2018,
  baseline_minutes_to_useful_meeting: 2019,
} as const;

export type EventId = (typeof EV)[keyof typeof EV];

export function emit(personId: string, eventId: EventId, value: string | number): void {
  try {
    const v = typeof value === "string" ? value.slice(0, 256) : value;
    // TODO(T4): queue + flush to POST /event/ingress/v1/json/in with k-token KEEWANO_API_KEY.
    console.log("[keewano]", eventId, personId, v);
  } catch (e) {
    console.error("[keewano] emit failed", e);
  }
}
