<script setup>
import { ArrowRight } from "lucide-vue-next";
import SectionBadge from "../ui/SectionBadge.vue";
import Button from "../ui/BaseButton.vue";
import StatCard from "../cards/StatCard.vue";

const stats = [
  { value: "10K+", label: "Active agents" },
  { value: "99.9%", label: "Uptime" },
  { value: "50M+", label: "Tasks automated" },
  { value: "24/7", label: "Support" },
];
</script>

<template>
  <section
    id="hero-section"
    class="relative isolate flex flex-col items-center gap-8 overflow-hidden border-b border-slate-800 pt-36 pb-24 text-center"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10"
      :style="{
        background:
          'radial-gradient(ellipse 70% 60% at 15% 10%, rgba(139, 92, 246, 0.35), transparent), radial-gradient(ellipse 70% 60% at 85% 90%, rgba(59, 130, 246, 0.25), transparent)',
      }"
    />
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size-[72px_72px] opacity-30"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-black"
    />

    <SectionBadge>✦ The future of coding ✦</SectionBadge>

    <h1 class="text-5xl leading-none font-black tracking-tight md:text-7xl">
      <span class="text-slate-50">Build smarter workflows</span>
      <br />
      <span class="text-violet-300">with Agentic AI</span>
    </h1>

    <p class="max-w-2xl text-sm text-slate-300 md:text-base">
      Create autonomous AI agents that think, plan, and execute complex tasks.
      Transform your business with intelligent automation.
    </p>

    <div class="flex flex-col items-center gap-4 py-10 md:flex-row">
      <Button href="#">
        Start learning with Holberton School <ArrowRight />
      </Button>
      <Button variant="secondary" href="#"> Methodology </Button>
    </div>

    <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :value="stat.value"
        :label="stat.label"
      />
    </div>
  </section>
</template>
