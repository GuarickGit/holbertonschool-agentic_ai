import features from "../data/features";
import FeatureCard from "../components/FeatureCard";

function Features() {
  return (
    <section id="features-section" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 pb-10">
          {/* Eyebrow */}
          <p className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            ♦ Features ♦
          </p>

          {/* Title */}
          <h2 className="text-center text-4xl leading-none font-black tracking-tight md:text-5xl">
            <span className="text-slate-50">Everything You Need to Build</span>
            <br />
            <span className="text-violet-300">With powerful AI agents</span>
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            return (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
