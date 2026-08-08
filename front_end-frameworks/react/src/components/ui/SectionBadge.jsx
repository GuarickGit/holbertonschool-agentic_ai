// children = tout ce qui est placé entre les balises du composant
function SectionBadge({ children }) {
  return (
    <p className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
      {children}
    </p>
  );
}

export default SectionBadge;
