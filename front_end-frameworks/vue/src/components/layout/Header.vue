<script setup>
import Brand from "../ui/Brand.vue";
import Button from "../ui/Button.vue";
</script>

<template>
  <header class="fixed top-0 right-0 left-0 z-50 bg-slate-950">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#">
        <Brand />
      </a>

      <div class="flex items-center gap-6">
        <nav class="hidden gap-6 text-sm text-slate-500 md:flex">
          <a href="#about-section">About</a>
          <a href="#features-section">Features</a>
          <a href="#insights-section">Insights</a>
          <a href="#contact-section">Contact</a>
        </nav>

        <Button href="#">Enroll now</Button>
      </div>
    </div>
  </header>
</template>
