import { BrainCircuit } from "lucide-react";

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-violet-500 p-2 text-slate-50 shadow-lg shadow-violet-500/40">
        <BrainCircuit />
      </div>
      <span className="font-bold text-slate-50">Agentic AI</span>
    </div>
  );
}

export default Brand;
