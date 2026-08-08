function SectionTitle({ line1, line2, className = "" }) {
  return (
    <h2
      className={`text-center text-4xl leading-none font-black tracking-tight md:text-5xl ${className}`}
    >
      <span className="text-slate-50">{line1}</span>
      <br />
      <span className="text-violet-300">{line2}</span>
    </h2>
  );
}

export default SectionTitle;
