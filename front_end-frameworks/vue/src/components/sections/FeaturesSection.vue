<script setup>
import features from "../../data/features.js";
import FeatureCard from "../cards/FeatureCard.vue";
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
</script>

<template>
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
        <FeatureCard
          v-for="(feature, index) in features"
          :key="index"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </div>
  </section>
</template>
