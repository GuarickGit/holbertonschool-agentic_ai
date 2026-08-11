<script>
  let { icon, label, href } = $props();
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={label}
  class="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-50"
  >{@render icon()}</a
>
