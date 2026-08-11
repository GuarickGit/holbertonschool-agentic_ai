<script>
  let { line1, line2, className = "" } = $props();
</script>

<h2
  class={`text-center text-4xl leading-none font-black tracking-tight md:text-5xl ${className}`}
>
  <span class="text-slate-50">{line1}</span>
  <br />
  <span class="text-violet-300">{line2}</span>
</h2>
