import features from "../../data/features";
import FeatureCard from "../cards/FeatureCard";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

function Features() {
  return (
    <section id="features-section" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 pb-10">
          {/* Eyebrow */}
          <SectionBadge>✦ Features ✦</SectionBadge>

          {/* Title */}
          <SectionTitle
            line1="Everything You Need to Build"
            line2="With powerful AI agents"
          />
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
