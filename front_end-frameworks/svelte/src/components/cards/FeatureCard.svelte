<script>
  let { icon: Icon, title, description } = $props();
</script>

<article
  class="flex flex-col items-start gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
>
  <div class="rounded-lg bg-violet-500 p-2 text-slate-50"><Icon /></div>
  <p class="font-semibold text-slate-50">{title}</p>
  <p class="text-slate-500">{description}</p>
</article>
