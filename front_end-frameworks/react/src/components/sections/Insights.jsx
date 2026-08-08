import { useState, useEffect } from "react";
import { getInsights } from "../../services/insightsService";
import InsightCard from "../cards/InsightCard";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

function Insights() {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInsights() {
      try {
        const data = await getInsights();
        setInsights(data);
      } catch (err) {
        setError("Failed to load insights.");
      }
    }
    fetchInsights();
  }, []);

  return (
    <section id="insights-section" className="bg-black py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Eyebrow*/}
          <SectionBadge>✦ Insights ✦</SectionBadge>

          {/* Title */}
          <SectionTitle
            line1="Explore Agentic AI"
            line2="Through real-world scenes"
            className="pb-10"
          />
        </div>

        {/* Affiche le message d'erreur seulement si error n'est pas vide */}
        {error && <p className="text-red-400">{error}</p>}

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, index) => {
            return (
              <InsightCard
                key={index}
                category={insight.category}
                title={insight.title}
                description={insight.description}
                image={insight.image}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Insights;
