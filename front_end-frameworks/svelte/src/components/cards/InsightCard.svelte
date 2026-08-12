<script>
  let { category, title, description, image, index } = $props();
</script>

<article
  class={`relative h-80 overflow-hidden rounded-xl border border-slate-800 shadow-xl shadow-slate-950/40 ${index === 0 ? "sm:col-span-2" : ""}`}
>
  <img
    src={image}
    alt={title}
    class="absolute inset-0 h-full w-full object-cover"
  />
  <div
    class="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"
  ></div>
  <div class="absolute right-0 bottom-0 left-0 space-y-3 p-6">
    <span
      class="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300"
      >{category}</span
    >
    <h3 class="pt-4 text-2xl font-bold text-slate-50">{title}</h3>
    <p class="text-sm text-slate-500 md:text-base">{description}</p>
  </div>
</article>
