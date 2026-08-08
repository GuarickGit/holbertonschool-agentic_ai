import { useState, useEffect } from "react";
import { getInsights } from "../../services/insightsService";
import InsightCard from "../cards/InsightCard";

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
          <p className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            ✦ Insights ✦
          </p>

          {/* Title */}
          <h2 className="pb-10 text-4xl leading-none font-black tracking-tight md:text-5xl">
            <span className="text-slate-50">Explore Agentic AI</span>
            <br />
            <span className="text-violet-300">Through real-world scenes</span>
          </h2>
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
