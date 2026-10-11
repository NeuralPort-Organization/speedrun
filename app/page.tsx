import Link from "next/link";

// Placeholder landing. T5 owns the real pages.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Giverank</h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        The AI networking agent that makes giving visible.
      </p>
      <Link className="rounded-full bg-black px-5 py-2 text-white dark:bg-white dark:text-black" href="/r/speedhacks">
        Check in to SpeedHacks
      </Link>
    </main>
  );
}
