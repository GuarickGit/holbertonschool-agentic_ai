// value = le chiffre affiché (ex: "10K+"), label = la légende en dessous (ex: "Active agents")
function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40">
      <p className="text-4xl font-black text-violet-300">{value}</p>
      <p className="text-slate-500">{label}</p>
    </div>
  );
}

export default StatCard;
