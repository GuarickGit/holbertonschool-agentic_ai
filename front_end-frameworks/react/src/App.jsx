import Header from "./components/Header";
import Hero from "./sections/Hero";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen"> {/* min-h-screen = Fond global de la page */}
        <Header />
        <Hero />
    </div>
  );
}

export default App;
