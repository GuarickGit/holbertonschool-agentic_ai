function InsightCard({ category, title, description, image, index }) {
  return (
    <article
      className={`relative h-80 overflow-hidden rounded-xl border border-slate-800 shadow-xl shadow-slate-950/40 ${index === 0 ? "sm:col-span-2" : ""}`}
    >
      {" "}
      {/* overflow-hidden = ne dépasse pas de l'arrondi | ajout de backticks et $ pour le js */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />{" "}
      {/* w-full h-full object-cover = l'image remplisse tout sans se déformer */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>{" "}
      {/* absolute inset-0 = Couvrir toute la carte */}
      <div className="absolute right-0 bottom-0 left-0 space-y-3 p-6">
        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
          {category}
        </span>
        <h3 className="pt-4 text-2xl font-bold text-slate-50">{title}</h3>
        <p className="text-sm text-slate-500 md:text-base">{description}</p>
      </div>
    </article>
  );
}

export default InsightCard;
