<script setup>
import { ref, onMounted } from "vue";
import { getInsights } from "../../services/insightsService.js";
import InsightCard from "../cards/InsightCard.vue";
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";

const insights = ref([]);
const error = ref("");

onMounted(async () => {
  try {
    const data = await getInsights();
    insights.value = data;
  } catch {
    error.value = "Failed to load insights.";
  }
});
</script>

<template>
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

      <p v-if="error" class="text-red-400">{{ error }}</p>

      <div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCard
          v-for="(insight, index) in insights"
          :key="index"
          :category="insight.category"
          :title="insight.title"
          :description="insight.description"
          :image="insight.image"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
