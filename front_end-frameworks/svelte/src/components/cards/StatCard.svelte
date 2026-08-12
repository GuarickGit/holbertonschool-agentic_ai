<script>
  let { value, label } = $props();
</script>

<div
  class="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40"
>
  <p class="text-4xl font-black text-violet-300">{value}</p>
  <p class="text-slate-500">{label}</p>
</div>
