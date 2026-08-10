<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
});

const baseClasses =
  "inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50";

const variantClasses =
  props.variant === "primary"
    ? "bg-violet-500 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
    : "border border-slate-800 bg-slate-950 hover:bg-slate-900";
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="baseClasses + ' ' + variantClasses"
  >
    <slot />
  </a>
</template>
