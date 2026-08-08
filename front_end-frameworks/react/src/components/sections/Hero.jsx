import { ArrowRight } from "lucide-react";
import SectionBadge from "../ui/SectionBadge";
import Button from "../ui/Button";
import StatCard from "../cards/StatCard";

/* Stats table for .map()*/
const stats = [
  { value: "10K+", label: "Active agents" },
  { value: "99.9%", label: "Uptime" },
  { value: "50M+", label: "Tasks automated" },
  { value: "24/7", label: "Support" },
];

function Hero() {
  return (
    <section
      id="hero-section"
      className="relative isolate flex flex-col items-center gap-8 overflow-hidden border-b border-slate-800 pt-36 pb-24 text-center"
    >
      {/* Glow radial violet + bleu, en fond de section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(139, 92, 246, 0.35), transparent), radial-gradient(ellipse 70% 60% at 85% 90%, rgba(59, 130, 246, 0.25), transparent)",
        }}
      />

      {/* Grid Overlay */}
      <div className="bg-size[72px_72px] pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] opacity-30" />

      {/* Fondu vers le noir en bas de section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-black" />

      {/* Eyebrow */}
      <SectionBadge>✦ The future of coding ✦</SectionBadge>

      {/* Title */}
      <h1 className="text-5xl leading-none font-black tracking-tight md:text-7xl">
        <span className="text-slate-50">Build smarter workflows</span>
        <br />
        <span className="text-violet-300">with Agentic AI</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-sm text-slate-300 md:text-base">
        Create autonomous AI agents that think, plan, and execute complex tasks.
        Transform your business with intelligent automation.
      </p>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4 py-10 md:flex-row">
        <Button href="#">
          Start learning with Holberton School <ArrowRight />
        </Button>

        <Button variant="secondary" href="#">
          Methodology
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => {
          return (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
