import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Features from "./components/sections/Features";
import Hero from "./components/sections/Hero";
import Insights from "./components/sections/Insights";

function App() {
  return (
    <div className="min-h-screen bg-slate-950"> {/* min-h-screen = Fond global de la page */}
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
