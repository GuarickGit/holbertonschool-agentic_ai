import { BrainCircuit } from "lucide-react";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 bg-slate-950">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-20">
        {/* Logo + Titre */}
        <a className="flex items-center gap-2" href="#">
          <div className="rounded-lg bg-violet-500 p-2 text-slate-50 shadow-lg shadow-violet-500/40">
            <BrainCircuit />
          </div>
          <span className="text-slate-50">Agentic AI</span>
        </a>

        {/* Navbar */}
        <div className="flex items-center gap-6">
          <nav className="hidden gap-6 text-slate-500 md:flex">
            <a href="#about-section">About</a>
            <a href="#features-section">Features</a>
            <a href="#insights-section">Insights</a>
            <a href="#contact-section">Contact</a>
          </nav>

          {/* CTA */}
          <a
            className="rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
            href="#"
          >
            Enroll now
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
