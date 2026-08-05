import { ArrowRight } from "lucide-react";

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
      className="flex flex-col items-center gap-8 pt-36 pb-24 text-center"
    >
      {/* Eyebrow */}
      <p className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
        ♦ The future of coding ♦
      </p>

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
      <div className="flex flex-col gap-4 md:flex-row py-10">
        <a
          className="inline-flex items-center gap-2 rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
          href="#"
        >
          Start learning with Holberton School <ArrowRight />
        </a>
        <a
          className="rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold text-slate-50 hover:bg-slate-900"
          href="#"
        >
          Methodology
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => {
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40"
            >
              <p className="text-4xl font-black text-violet-300">{stat.value}</p>
              <p className="text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
