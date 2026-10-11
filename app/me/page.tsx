import Link from "next/link";
import { db } from "@/lib/supabase/server";
import { getPersonId } from "@/lib/session";
import type { Match } from "@/lib/types";

// Minimal T1 version so the thin path is testable; T5 owns the real /me (QR, intros, balance, Darwin cards).
export default async function MePage() {
  const pid = await getPersonId();
  const supa = db();
  const { data: me } = pid
    ? await supa.from("people").select("id,name,role,needs,gives").eq("id", pid).maybeSingle()
    : { data: null };

  if (!me) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold">You&apos;re not checked in yet</h1>
        <Link className="rounded-full bg-black px-5 py-3 font-medium text-white dark:bg-white dark:text-black" href="/r/speedhacks">
          Check in
        </Link>
      </main>
    );
  }

  const { data: matches } = await supa
    .from("matches")
    .select("*")
    .or(`a_id.eq.${me.id},b_id.eq.${me.id}`)
    .order("combined", { ascending: false });

  const otherIds = (matches ?? []).map((m: Match) => (m.a_id === me.id ? m.b_id : m.a_id));
  const { data: others } = otherIds.length
    ? await supa.from("public_people").select("id,display_name,role").in("id", otherIds)
    : { data: [] };
  const byId = new Map((others ?? []).map((o) => [o.id, o]));

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-10">
      <header>
        <p className="text-sm text-zinc-500">Checked in as</p>
        <h1 className="text-3xl font-semibold tracking-tight">{me.name}</h1>
        {me.role && <p className="text-zinc-600 dark:text-zinc-400">{me.role}</p>}
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">People you should meet</h2>
        {!matches?.length && (
          <p className="text-zinc-600 dark:text-zinc-400">Your agent is finding people… refresh in a moment.</p>
        )}
        {(matches ?? []).map((m: Match) => {
          const otherId = m.a_id === me.id ? m.b_id : m.a_id;
          const other = byId.get(otherId);
          return (
            <article key={m.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold">{other?.display_name ?? "Someone here"}</h3>
                <span className="text-sm text-zinc-500">{m.combined}% fit</span>
              </div>
              {other?.role && <p className="text-sm text-zinc-500">{other.role}</p>}
              <p className="mt-2">{m.a_id === me.id ? m.why_for_a : m.why_for_b}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
