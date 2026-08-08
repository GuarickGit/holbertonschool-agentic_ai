import Brand from "../ui/Brand";
import Button from "../ui/Button";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo + Titre */}
        <a href="#">
          <Brand />
        </a>

        {/* Navbar */}
        <div className="flex items-center gap-6">
          <nav className="hidden gap-6 text-sm text-slate-500 md:flex">
            <a href="#about-section">About</a>
            <a href="#features-section">Features</a>
            <a href="#insights-section">Insights</a>
            <a href="#contact-section">Contact</a>
          </nav>

          {/* CTA */}
          <Button href="#">Enroll now</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
