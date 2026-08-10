<script setup>
import Footer from "./components/layout/AppFooter.vue";
import Header from "./components/layout/AppHeader.vue";
import About from "./components/sections/AboutSection.vue";
import Contact from "./components/sections/ContactSection.vue";
import Features from "./components/sections/FeaturesSection.vue";
import Hero from "./components/sections/HeroSection.vue";
import Insights from "./components/sections/InsightsSection.vue";
</script>

<template>
  <div class="min-h-screen bg-slate-950">
    <Header />
    <main>
      <Hero />
      <About />
      <Features />
      <Insights />
      <Contact />
    </main>
    <Footer />
  </div>
</template>
