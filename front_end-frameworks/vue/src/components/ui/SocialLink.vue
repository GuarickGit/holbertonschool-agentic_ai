<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label"
    class="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-50"
  >
    <component :is="icon" />
  </a>
</template>
