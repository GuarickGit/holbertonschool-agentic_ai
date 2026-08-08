// variant: "primary" (violet, par défaut) ou "secondary" (bordure)
// external: true = lien externe (ouvre un nouvel onglet + sécurité), false = lien interne
// children: contenu du bouton (texte, et une icône si besoin)
function Button({ variant = "primary", href, external = false, children }) {
  // Classes communes aux deux variantes
  const baseClasses =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50";

  // Classes qui changent selon la variante choisie
  const variantClasses =
    variant === "primary"
      ? "bg-violet-500 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
      : "border border-slate-800 bg-slate-950 hover:bg-slate-900";

  return (
    <a
      href={href}
      // Si external, on ajoute target/rel ; sinon undefined = attribut absent
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={baseClasses + " " + variantClasses}
    >
      {children}
    </a>
  );
}

export default Button;
