import { ArrowRight } from 'lucide-react';

  /* Stats table for .map()*/
  const stats = [
    {value: "10K+", label: "Active agents"},
    {value: "99.9%", label: "Uptime"},
    {value: "50M+", label: "Tasks automated"},
    {value: "24/7", label: "Support"}
  ];

function Hero() {

  return (
    <section id="hero-section" className="pt-36 pb-24 flex flex-col items-center text-center gap-8">
      {/* Eyebrow */}
      <p className="px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">♦ The future of coding ♦</p>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
        <span className="text-slate-50">Build smarter workflows</span>
        <br/>
        <span className="text-violet-300">with Agentic AI</span>
      </h1>

      {/* Description */}
      <p className="text-sm md:text-base text-slate-300 max-w-2xl">Create autonomous AI agents that think, plan, and execute complex tasks. Transform your business with intelligent automation.</p>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-4">
        <a className="items-center inline-flex gap-2 px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-slate-50" href="#">Start learning with Holberton School <ArrowRight /></a>
        <a className="px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-50" href="#">Methodology</a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => {
          return (
            <div key={stat.label} className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
              <p className="text-violet-300 text-5xl font-bold">{stat.value}</p>
              <p className="text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>

  )
}

export default Hero;
