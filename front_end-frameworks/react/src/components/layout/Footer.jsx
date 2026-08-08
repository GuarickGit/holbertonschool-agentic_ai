import Brand from "../ui/Brand";
import SocialLink from "../ui/SocialLink";
import { Instagram, Tiktok, TwitterX, Youtube } from "react-bootstrap-icons";

function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pt-20 pb-12 md:flex-row md:justify-between">
        <div>
          {/* Brand */}
          <Brand />

          {/* Description */}
          <p className="mt-4 text-sm text-slate-500">
            Explore the future of development with Agentic AI.
          </p>

          {/* Socials Media */}
          <ul className="mt-4 flex gap-3">
            {/* Instagram */}
            <li>
              <SocialLink icon={<Instagram />} label="Instagram" href="#" />
            </li>

            {/* Tiktok */}
            <li>
              <SocialLink icon={<Tiktok />} label="Tiktok" href="#" />
            </li>

            {/* Twitter / X */}
            <li>
              <SocialLink icon={<TwitterX />} label="X" href="#" />
            </li>
            {/* Youtube */}
            <li>
              <SocialLink icon={<Youtube />} label="Youtube" href="#" />
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-28">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-slate-50">Navigation</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
              <li>
                <a href="#hero-section">Hero section</a>
              </li>
              <li>
                <a href="#about-section">About</a>
              </li>
              <li>
                <a href="#features-section">Features</a>
              </li>
              <li>
                <a href="#insights-section">Insights</a>
              </li>
              <li>
                <a href="#contact-section">Contact</a>
              </li>
            </ul>
          </div>

          {/* Holberton School */}
          <div>
            <h3 className="text-sm font-bold text-slate-50">
              Holberton School
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
              <li>
                <a
                  href="https://www.holbertonschool.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://www.holbertonschool.fr/methodologie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Methodology
                </a>
              </li>
              <li>
                <a
                  href="https://www.holbertonschool.fr/a-propos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Story
                </a>
              </li>
              <li>
                <a
                  href="https://www.holbertonschool.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agenda
                </a>
              </li>
            </ul>
          </div>

          {/* Curriculum */}
          <div>
            <h3 className="text-sm font-bold text-slate-50">Curriculum</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
              <li>
                <a
                  href="https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bachelor
                </a>
              </li>
              <li>
                <a
                  href="https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Program
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto flex max-w-6xl flex-col border-t border-slate-800 px-6 pt-4 pb-24 text-sm text-slate-500 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} FRESNE Kévin</p>
        <p>Built for the Holberton School Front-end Frameworks curriculum.</p>
      </div>
    </footer>
  );
}

export default Footer;
