function FeatureCard(props) {
  const Icon = props.icon; // props.icon = composant, besoin d'une maj. pour l'utiliser en JSX

  return (
    <article className="flex flex-col items-start gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
      <div className="rounded-lg bg-violet-500 p-2 text-slate-50">
        <Icon />
      </div>
      <p className="font-semibold text-slate-50">{props.title}</p>
      <p className="text-slate-500">{props.description}</p>
    </article>
  );
}

export default FeatureCard;
