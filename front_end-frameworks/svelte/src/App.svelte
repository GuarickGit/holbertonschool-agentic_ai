<script>
  import Footer from "./components/layout/Footer.svelte";
  import Header from "./components/layout/Header.svelte";
  import About from "./components/sections/About.svelte";
  import Contact from "./components/sections/Contact.svelte";
  import Features from "./components/sections/Features.svelte";
  import Hero from "./components/sections/Hero.svelte";
  import Insights from "./components/sections/Insights.svelte";
</script>

<div class="min-h-screen bg-slate-950">
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
