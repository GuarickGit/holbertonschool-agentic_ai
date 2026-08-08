function SocialLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-50"
    >
      {icon}
    </a>
  );
}

export default SocialLink;
