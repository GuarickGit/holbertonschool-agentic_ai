import { BrainCircuit } from 'lucide-react';

function Header() {
  return (
    <header className="bg-slate-950 fixed top-0 left-0 right-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        
        // Logo + Titre
        <a className="flex items-center gap-2" href="#">
          <div className="bg-violet-500 text-slate-50 rounded-lg shadow-lg shadow-violet-500/40 p-2">
            <BrainCircuit />
          </div>
          <span className="text-slate-50">Agentic AI</span>
        </a>

        // Navbar
        <div className="flex items-center gap-6">
          <nav className="gap-6 text-slate-500 hidden md:flex">
            <a href="#about-section">About</a>
            <a href="#features-section">Features</a>
            <a href="#insights-section">Insights</a>
            <a href="#contact-section">Contact</a>
          </nav>

        // CTA
          <a className="px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-slate-50" href="#">Enroll now</a>
        </div>
      </div>
    </header>

  );
}

export default Header;
