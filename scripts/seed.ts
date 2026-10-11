// Seeds the 'speedhacks' room + 25 FICTIONAL profiles (PLAN §8 "Seed profiles").
// Idempotent: fixed UUIDs, upserted. Run: npm run seed
// None of these are real people. No phone numbers. is_seed = true.
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const supa = createClient(url, key, { auth: { persistSession: false } });

type Seed = { name: string; role: string; who_i_am: string; needs: string; gives: string; show_name?: boolean };

const SEEDS: Seed[] = [
  // ── Showcase pair (concept doc §2): BrainTech founder × Japan DeepTech investor ──
  {
    name: "Kenji Morita",
    role: "Founder",
    who_i_am: "Founder & CEO of Synapsis Labs (Tokyo), a non-invasive EEG headband that measures focus and fatigue for knowledge workers. 14 people, revenue from Japanese enterprise pilots.",
    needs: "U.S. investors interested in BrainTech for our Series A; U.S. enterprise pilot customers.",
    gives: "Access to a differentiated BrainTech company and the Japanese neurotech ecosystem; intros to Japanese neuroscience labs and corporate R&D teams.",
  },
  {
    name: "Rachel Okafor",
    role: "Investor",
    who_i_am: "Partner at Meridian Bridge Ventures, a U.S. fund backing Japanese DeepTech startups expanding to the U.S.",
    needs: "Japanese DeepTech startups, especially neurotech, robotics and advanced materials, raising Series A.",
    gives: "Series A capital, U.S. network, fundraising support and U.S. go-to-market help for Japanese founders.",
  },
  // ── Darwin demo: a need nobody in the room can meet ──
  {
    name: "Maya Lindqvist",
    role: "Founder",
    who_i_am: "Solo founder of Ledgerleaf, carbon accounting software for small manufacturers. Raising a first pre-seed round.",
    needs: "Help drafting and understanding SAFE documents for my pre-seed round; pilot customers in manufacturing.",
    gives: "Climate and emissions data expertise; intros to sustainability leads at mid-size manufacturers.",
  },
  // ── Devtools cluster ──
  {
    name: "Diego Alvarez",
    role: "Founder",
    who_i_am: "Founder of Testwright, AI that writes and maintains end-to-end tests. Pre-seed, 40 design partners on the waitlist.",
    needs: "A technical co-founder with infrastructure and distributed-systems experience; pre-seed investors in devtools.",
    gives: "Early-stage GTM advice for devtools; access to a 3k-member developer community I run.",
  },
  {
    name: "Priya Raman",
    role: "Engineer",
    who_i_am: "Staff engineer, 8 years on distributed systems and storage at a large cloud provider. Ready to leave and build.",
    needs: "A co-founder role at an early devtools or infra startup with a real wedge.",
    gives: "Infrastructure and scaling expertise, architecture and code reviews, hiring senior backend engineers.",
  },
  {
    name: "Tom Becker",
    role: "Investor",
    who_i_am: "Angel and pre-seed investor in developer tools and AI infrastructure; ex-founder of a CI company.",
    needs: "Pre-seed devtools and AI infra founders with strong technical teams.",
    gives: "Pre-seed checks of $25k–$100k; intros to developer-focused seed funds; devtools pricing advice.",
  },
  // ── Fintech cluster ──
  {
    name: "Aisha Mensah",
    role: "Founder",
    who_i_am: "Founder of Paystride, cross-border payroll for remote teams in Africa. Live in Nigeria and Kenya.",
    needs: "Seed investors in fintech and emerging markets; a mentor who has handled payments compliance and licensing.",
    gives: "Emerging-markets payments expertise; founder network in Lagos and Nairobi.",
  },
  {
    name: "Lucas Ferreira",
    role: "Investor",
    who_i_am: "Principal at Tidewater Capital, a seed fund focused on fintech infrastructure and emerging markets.",
    needs: "Seed-stage fintech founders, especially payments and payroll in emerging markets.",
    gives: "Seed capital; intros to banking and sponsor-bank partners; compliance playbooks from our portfolio.",
  },
  // ── Students ──
  {
    name: "Hannah Cho",
    role: "Student",
    who_i_am: "CS junior at a Bay Area university; ML research assistant; ships React/TypeScript side projects.",
    needs: "A summer internship at an early-stage AI startup.",
    gives: "ML research help, React/TypeScript frontend work, campus recruiting reach for startups hiring interns.",
  },
  {
    name: "Omar Haddad",
    role: "Student",
    who_i_am: "EE and neuroscience student; built an EEG signal-processing pipeline for my lab.",
    needs: "An internship in neurotech or hardware, ideally on EEG or wearables.",
    gives: "Signal processing and EEG data analysis; Python tooling for lab data.",
  },
  {
    name: "Fatima Zahra",
    role: "Student",
    who_i_am: "MBA student, previously in strategy consulting; focused on climate and fintech.",
    needs: "A VC internship or associate role at an early-stage fund.",
    gives: "Market research and diligence memos; market sizing for founders preparing a raise.",
  },
  // ── Healthtech / edtech / robotics / consumer founders ──
  {
    name: "Grace Liu",
    role: "Founder",
    who_i_am: "Founder of Clinicloop, AI agents that handle intake and scheduling for small clinics. Seed-funded, 6 people.",
    needs: "Frontend interns; healthcare clinic design partners; a Japan market partner for expansion.",
    gives: "Mentorship for students breaking into startups; accelerator application advice; healthcare AI know-how.",
  },
  {
    name: "Jamal Wright",
    role: "Founder",
    who_i_am: "Founder of Tutorly, an AI tutor for community college math. Piloting in two districts.",
    needs: "Help evaluating LLM answer quality and hallucinations; more community-college district partners.",
    gives: "Education-sector network; user research with students; grant-writing experience.",
  },
  {
    name: "Ryan O'Neill",
    role: "Founder",
    who_i_am: "Founder of Pickwise Robotics, warehouse piece-picking robots. Post-seed, 3 paying customers.",
    needs: "Manufacturing partners in Japan for our gripper hardware; Series A investor intros.",
    gives: "Robotics hardware and supply-chain expertise; intros to logistics operators.",
  },
  {
    name: "Isabel Moreno",
    role: "Founder",
    who_i_am: "Founder of Gatherly, a consumer app that helps people find small community events in SF.",
    needs: "A growth marketer; event-organizer partners.",
    gives: "Event organizing and community building; access to 200+ SF community events for distribution.",
  },
  // ── Engineers / designers ──
  {
    name: "Nadia Petrova",
    role: "Engineer",
    who_i_am: "ML engineer specializing in LLM evaluation and fine-tuning; built eval harnesses at two AI startups.",
    needs: "A co-founder with product and go-to-market strength; real users for my open-source eval tool.",
    gives: "LLM evaluation, hallucination testing and fine-tuning help.",
  },
  {
    name: "Zoe Adams",
    role: "Designer",
    who_i_am: "Product designer, 6 years in consumer and B2B SaaS; designed onboarding for two apps with 1M+ users.",
    needs: "A founding designer role at a seed-stage startup.",
    gives: "Product design, onboarding flows, brand identity.",
  },
  // ── Corporate BD ──
  {
    name: "Ben Whitaker",
    role: "Corporate BD",
    who_i_am: "Head of innovation partnerships at Northwind Industrial, a (fictional) mid-size industrial manufacturer.",
    needs: "Climate-tech startups to pilot Scope 3 emissions tracking; warehouse automation vendors.",
    gives: "Paid pilot programs; procurement intros; a real manufacturing floor to test on.",
  },
  {
    name: "Mei Tanaka",
    role: "Corporate BD",
    who_i_am: "SF lead for the open-innovation office of a (fictional) Japanese conglomerate, Hoshizora Group.",
    needs: "U.S. startups in healthtech and robotics for Japan market-entry partnerships.",
    gives: "Japan market access; corporate proof-of-concept budget; manufacturing partner intros in Japan.",
  },
  // ── Investors ──
  {
    name: "Carlos Mendes",
    role: "Investor",
    who_i_am: "Partner at Greenline Seed, a climate-focused seed fund.",
    needs: "Climate founders working on industrial decarbonization and emissions data.",
    gives: "Seed capital; climate LP network; intros to industrial corporates for pilots.",
  },
  {
    name: "Alex Novak",
    role: "Investor",
    who_i_am: "Pre-seed scout for a large fund; former student founder.",
    needs: "Scout-worthy technical founders, including student founders.",
    gives: "Small pre-seed checks; weekly office hours; intros to student-friendly accelerators; VC internship referrals.",
  },
  // ── Researchers ──
  {
    name: "Sofia Rossi",
    role: "Researcher",
    who_i_am: "Neuroscience postdoc studying sleep and attention; runs EEG studies.",
    needs: "Industry partners to commercialize my sleep research; an engineer to help with EEG data pipelines.",
    gives: "Neuroscience expertise; clinical study design; access to a sleep lab.",
  },
  {
    name: "Lena Schmidt",
    role: "Researcher",
    who_i_am: "AI safety researcher focused on evaluations and red-teaming of deployed LLM products.",
    needs: "Real-world deployment data and case studies from startups shipping LLM features.",
    gives: "Eval frameworks, red-teaming of LLM products, safety reviews.",
  },
  // ── Mentors ──
  {
    name: "Ethan Park",
    role: "Mentor",
    who_i_am: "Two-time founder (B2B SaaS, both acquired); now mentoring.",
    needs: "Ambitious first-time founders to mentor.",
    gives: "Pitch feedback before fundraising; hiring your first 10 engineers; co-founder conflict advice.",
  },
  {
    name: "Victor Huang",
    role: "Mentor",
    who_i_am: "Former CFO of a Series C SaaS company.",
    needs: "Founders preparing for Series A who want an operator advisor.",
    gives: "Financial models, unit economics, pricing and board decks for Series A and later.",
  },
];

const seedId = (i: number) => `00000000-0000-4000-8000-${String(i + 1).padStart(12, "0")}`;

async function main() {
  const { data: room, error: roomErr } = await supa
    .from("rooms")
    .upsert({ slug: "speedhacks", name: "SpeedHacks SF" }, { onConflict: "slug" })
    .select("id")
    .single();
  if (roomErr) throw roomErr;

  const rows = SEEDS.map((s, i) => ({
    id: seedId(i),
    room_id: room.id,
    name: s.name,
    phone: null,
    role: s.role,
    who_i_am: s.who_i_am,
    needs: s.needs,
    gives: s.gives,
    show_name: s.show_name ?? true,
    is_seed: true,
    profile_source: "seed",
  }));

  const { error } = await supa.from("people").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`Seeded room speedhacks (${room.id}) with ${rows.length} fictional people.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
