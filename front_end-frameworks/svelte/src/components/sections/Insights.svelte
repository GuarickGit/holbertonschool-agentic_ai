<script>
  import { getInsights } from "../../services/insightsService.js";
  import InsightCard from "../cards/InsightCard.svelte";
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";

  let insights = $state([]);
  let error = $state("");

  $effect(() => {
    async function fetchInsights() {
      try {
        const data = await getInsights();
        insights = data;
      } catch {
        error = "Failed to load insights.";
      }
    }
    fetchInsights();
  });
</script>

<section id="insights-section" class="bg-black py-24">
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
    <div class="flex flex-col items-center gap-8 text-center">
      <SectionBadge>✦ Insights ✦</SectionBadge>
      <SectionTitle
        line1="Explore Agentic AI"
        line2="Through real-world scenes"
        className="pb-10"
      />
    </div>
    {#if error}
      <p class="text-red-400">{error}</p>
    {/if}
    <div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {#each insights as insight, index (index)}
        <InsightCard
          category={insight.category}
          title={insight.title}
          description={insight.description}
          image={insight.image}
          {index}
        />
      {/each}
    </div>
  </div>
</section>
