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
      className="flex flex-col items-center gap-8 pt-36 pb-24 text-center"
    >
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
