// Row types for supabase/schema.sql (PLAN §3). Keep in sync with the frozen schema.

export type Room = { id: string; slug: string; name: string };

export type Person = {
  id: string;
  room_id: string;
  name: string;
  phone: string | null; // SERVER ONLY. Never send to the browser.
  role: string | null;
  who_i_am: string;
  needs: string;
  gives: string;
  show_name: boolean;
  qr_token: string;
  follow_through: number;
  is_seed: boolean;
  profile_source: "form" | "call" | "seed";
  created_at: string;
};

/** Safe-to-render subset of Person (no phone). */
export type PublicPerson = Omit<Person, "phone">;

export type Match = {
  id: string;
  room_id: string;
  a_id: string;
  b_id: string;
  b_fits_a: number;
  a_fits_b: number;
  combined: number;
  why_for_a: string;
  why_for_b: string;
  created_at: string;
};

export type IntroStatus = "proposed" | "accepted" | "met" | "rated" | "declined";

export type Intro = {
  id: string;
  room_id: string;
  a_id: string;
  b_id: string;
  introducer_id: string | null;
  match_id: string | null;
  note: string | null;
  status: IntroStatus;
  a_accepted: boolean | null;
  b_accepted: boolean | null;
  met_at: string | null;
  created_at: string;
};

export type Encounter = { id: string; room_id: string; scanner_id: string; scanned_id: string; created_at: string };

export type Rating = {
  id: string;
  intro_id: string;
  rater_id: string;
  ratee_id: string;
  value: 0 | 1 | 2 | 3;
  source: "web" | "call";
  created_at: string;
};

export type LedgerEntry = {
  id: string;
  person_id: string;
  intro_id: string | null;
  kind: "introducer_stage" | "introduced_cost" | "value_flow";
  stage: "accepted" | "met" | "valuable" | null;
  delta: number;
  created_at: string;
};

export type CallJob = {
  id: string;
  person_id: string;
  intro_id: string | null;
  kind: "intake" | "briefing" | "followup";
  status: "queued" | "dialing" | "done" | "failed";
  dial_call_id: string | null;
  transcript: string | null;
  result: Record<string, unknown> | null;
  not_before: string;
  created_at: string;
  updated_at: string;
};

export type AgentMatch = {
  id: string;
  person_id: string;
  need: string;
  agent_name: string;
  why: string;
  connect: Record<string, unknown> | null;
  created_at: string;
};

export type PublicGiver = {
  id: string;
  display_name: string;
  role: string | null;
  give_score: number;
  verified_intros: number;
  helpfulness: number | null;
};

export type PublicPeopleRow = {
  id: string;
  room_id: string;
  display_name: string;
  role: string | null;
  is_seed: boolean;
  profile_source: string;
  created_at: string;
};
