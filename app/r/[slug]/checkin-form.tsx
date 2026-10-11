"use client";

import { useState } from "react";

const ROLES = ["Founder", "Investor", "Engineer", "Designer", "Student", "Researcher", "Mentor", "Corporate BD", "Sponsor"];

const input =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100";

export default function CheckinForm({ slug }: { slug: string }) {
  const [busy, setBusy] = useState<"form" | "interview" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<"form" | "interview" | null>(null);

  async function submit(form: HTMLFormElement, interview: boolean) {
    setError(null);
    setBusy(interview ? "interview" : "form");
    const f = new FormData(form);
    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug,
          name: f.get("name"),
          phone: f.get("phone"),
          role: f.get("role"),
          who_i_am: f.get("who_i_am"),
          needs: f.get("needs"),
          gives: f.get("gives"),
          show_name: f.get("show_name") === "on",
          interview,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Check-in failed");
      setDone(interview ? "interview" : "form");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check-in failed");
    } finally {
      setBusy(null);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">You&apos;re checked in.</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          {done === "interview"
            ? "Your phone will ring shortly. Your agent will ask three quick questions, then find your matches."
            : "Your agent is finding the people you should meet."}
        </p>
        <a className="font-medium underline" href="/me">
          See my matches →
        </a>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget, false);
      }}
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Name</span>
        <input className={input} name="name" required autoComplete="name" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Phone (only for the agent call, never shown)</span>
        <input className={input} name="phone" type="tel" autoComplete="tel" placeholder="+1 415 555 0123" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">I am a</span>
        <select className={input} name="role" defaultValue="Founder">
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>

      <button
        type="button"
        disabled={busy !== null}
        onClick={(e) => submit(e.currentTarget.form!, true)}
        className="rounded-full bg-black px-5 py-3 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {busy === "interview" ? "Queuing your call…" : "📞 Let my agent interview me"}
      </button>
      <p className="text-center text-sm text-zinc-500">or type it in</p>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Who I am</span>
        <textarea className={input} name="who_i_am" rows={2} placeholder="What you work on" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">I need</span>
        <textarea className={input} name="needs" rows={2} placeholder="Capital, a co-founder, hires, customers, mentors…" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">I can give</span>
        <textarea className={input} name="gives" rows={2} placeholder="Intros, expertise, feedback…" />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="show_name" />
        <span className="text-sm">Show my name on the big screen</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={busy !== null}
        className="rounded-full border border-zinc-900 px-5 py-3 font-medium disabled:opacity-50 dark:border-zinc-100"
      >
        {busy === "form" ? "Checking in…" : "Find my matches"}
      </button>
    </form>
  );
}
