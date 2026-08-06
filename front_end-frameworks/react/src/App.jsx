import Header from "./components/Header";
import About from "./sections/About";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import Insights from "./sections/Insights";

function App() {
  return (
    <div className="min-h-screen bg-slate-950"> {/* min-h-screen = Fond global de la page */}
      <Header />
      <Hero />
      <About />
      <Features />
      <Insights />
    </div>
  );
}

export default App;
