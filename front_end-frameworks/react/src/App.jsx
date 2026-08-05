import Header from "./components/Header";
import About from "./sections/About";
import Hero from "./sections/Hero";

function App() {
  return (
    <div className="min-h-screen bg-slate-950"> {/* min-h-screen = Fond global de la page */}
      <Header />
      <Hero />
      <About />
    </div>
  );
}

export default App;
