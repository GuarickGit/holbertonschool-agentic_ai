<script>
  import Brand from "../ui/Brand.svelte";
  import SocialLink from "../ui/SocialLink.svelte";
  import { Instagram, Tiktok, TwitterX, Youtube } from "svelte-bootstrap-icons";
</script>

<footer class="bg-black">
  <div
    class="mx-auto flex max-w-6xl flex-col gap-16 px-6 pt-20 pb-12 md:flex-row md:justify-between"
  >
    <div>
      <Brand />
      <p class="mt-4 text-sm text-slate-500">
        Explore the future of development with Agentic AI.
      </p>
      <ul class="mt-4 flex gap-3">
        <li>
          <SocialLink label="Instagram" href="#"
            >{#snippet icon()}<Instagram />{/snippet}</SocialLink
          >
        </li>
        <li>
          <SocialLink label="Tiktok" href="#"
            >{#snippet icon()}<Tiktok />{/snippet}</SocialLink
          >
        </li>
        <li>
          <SocialLink label="X" href="#"
            >{#snippet icon()}<TwitterX />{/snippet}</SocialLink
          >
        </li>
        <li>
          <SocialLink label="Youtube" href="#"
            >{#snippet icon()}<Youtube />{/snippet}</SocialLink
          >
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-8 md:flex-row md:gap-28">
      <div>
        <h3 class="text-sm font-bold text-slate-50">Navigation</h3>
        <ul class="mt-4 flex flex-col gap-2 text-sm text-slate-500">
          <li><a href="#hero-section">Hero section</a></li>
          <li><a href="#about-section">About</a></li>
          <li><a href="#features-section">Features</a></li>
          <li><a href="#insights-section">Insights</a></li>
          <li><a href="#contact-section">Contact</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-bold text-slate-50">Holberton School</h3>
        <ul class="mt-4 flex flex-col gap-2 text-sm text-slate-500">
          <li>
            <a
              href="https://www.holbertonschool.fr/"
              target="_blank"
              rel="noopener noreferrer">About</a
            >
          </li>
          <li>
            <a
              href="https://www.holbertonschool.fr/methodologie"
              target="_blank"
              rel="noopener noreferrer">Methodology</a
            >
          </li>
          <li>
            <a
              href="https://www.holbertonschool.fr/a-propos"
              target="_blank"
              rel="noopener noreferrer">Story</a
            >
          </li>
          <li>
            <a
              href="https://www.holbertonschool.fr/"
              target="_blank"
              rel="noopener noreferrer">Agenda</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-bold text-slate-50">Curriculum</h3>
        <ul class="mt-4 flex flex-col gap-2 text-sm text-slate-500">
          <li>
            <a
              href="https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering"
              target="_blank"
              rel="noopener noreferrer">Bachelor</a
            >
          </li>
          <li>
            <a
              href="https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme"
              target="_blank"
              rel="noopener noreferrer">Program</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div
    class="mx-auto flex max-w-6xl flex-col border-t border-slate-800 px-6 pt-4 pb-24 text-sm text-slate-500 md:flex-row md:justify-between"
  >
    <p>© {new Date().getFullYear()} FRESNE Kévin</p>
    <p>Built for the Holberton School Front-end Frameworks curriculum.</p>
  </div>
</footer>
