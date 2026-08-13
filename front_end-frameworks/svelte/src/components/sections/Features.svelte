<script>
  import features from "../../data/features.js";
  import FeatureCard from "../cards/FeatureCard.svelte";
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
</script>

<section id="features-section" class="bg-black py-24">
  <div class="mx-auto max-w-6xl px-6">
    <div class="flex flex-col items-center gap-4 pb-10">
      <SectionBadge>✦ Features ✦</SectionBadge>
      <SectionTitle
        line1="Everything You Need to Build"
        line2="With powerful AI agents"
      />
    </div>
    <div class="grid gap-8 md:grid-cols-3">
      {#each features as feature, index (index)}
        <FeatureCard
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      {/each}
    </div>
  </div>
</section>
