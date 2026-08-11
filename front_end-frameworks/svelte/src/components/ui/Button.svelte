<script>
  let { variant = "primary", href, external = false, children } = $props();

  const baseClasses =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50";
  const variantClasses = $derived(
    variant === "primary"
      ? "bg-violet-500 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
      : "border border-slate-800 bg-slate-950 hover:bg-slate-900",
  );
</script>

<a
  {href}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class={baseClasses + " " + variantClasses}>{@render children?.()}</a
>
