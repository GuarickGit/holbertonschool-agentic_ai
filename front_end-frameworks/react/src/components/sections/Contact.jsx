import {
  ArrowRight,
  AtSign,
  FolderKanban,
  Mail,
  User,
  Users,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

function Contact() {
  // input contrôlé = State contenant les valeurs du form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  // State Focus
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    message: false,
  });

  // State d'envoi
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Please fill all required fields.",
  );

  // Validation du Nom
  const isNameValid = formData.fullName.length >= 2;

  // Validation de l'Email
  const isEmailValid =
    formData.email.includes("@") && formData.email.includes(".");

  // Validation du Message
  const isMessageValid = formData.message.length >= 10;

  // Validation du Form
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  // Validation bordure des champs
  const nameBorderClass = !touched.fullName
    ? "border-slate-800"
    : isNameValid
      ? "border-violet-500"
      : "border-red-500";

  const emailBorderClass = !touched.email
    ? "border-slate-800"
    : isEmailValid
      ? "border-violet-500"
      : "border-red-500";

  const messageBorderClass = !touched.message
    ? "border-slate-800"
    : isMessageValid
      ? "border-violet-500"
      : "border-red-500";

  // Gestion du submit
  async function handleSubmit(e) {
    e.preventDefault(); // preventDefault = empêche le comportement par défaut du navigateur = ici de recharger la page
    setIsSending(true);
    setFeedbackMessage("Sending message...");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // new Promise = crée une promesse qui se termine plus tard
    // resolve = fonction à appeler pour dire "c'est fini"
    // setTimeout(resolve, 1500) = appelle resolve après 1.5s
    // await = attend que la promesse soit terminée avant de go next

    setFeedbackMessage("Your message has been sent successfully.");

    // Reset du Form
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });

    setTouched({
      fullName: false,
      email: false,
      message: false,
    });

    setIsSending(false);

    setTimeout(() => {
      setFeedbackMessage("Please fill all required fields.");
    }, 3000);
  }

  return (
    <section
      id="contact-section"
      className="relative isolate overflow-hidden border-b border-slate-800 py-24"
    >
      {/* Glow radial violet + bleu, en fond de section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 10%, rgba(139, 92, 246, 0.35), transparent), radial-gradient(ellipse 70% 60% at 85% 90%, rgba(59, 130, 246, 0.25), transparent)",
        }}
      />

      {/* Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size-[72px_72px] opacity-30" />

      {/* Fondu vers le noir en bas de section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-black" />

      {/* Contenu contraint en largeur */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
        {/* Eyebrow */}
        <SectionBadge>✦ Start your AI journey ✦</SectionBadge>

        {/* Title */}
        <SectionTitle line1="Ready to Explore" line2="Agentic AI?" />

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 py-10 md:flex-row">
          <Button
            href="https://www.holbertonschool.fr/rejoindre-lhippocamp"
            external
          >
            Enroll at Holberton School <ArrowRight />
          </Button>

          <Button
            variant="secondary"
            href="https://www.holbertonschool.fr/admission"
            external
          >
            Need more information?
          </Button>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FolderKanban size={16} className="text-violet-500" />
            <span>Project-based learning</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} className="text-violet-500" />
            <span>Peer learning environment</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles size={16} className="text-violet-500" />
            <span>AI-powered workflows</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
        >
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 flex items-center gap-2 font-semibold text-slate-50"
            >
              <User size={16} className="text-violet-500" />
              <span>Full Name</span>
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Your full name..."
              value={formData.fullName}
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              onBlur={() => setTouched({ ...touched, fullName: true })}
              className={`w-full rounded-md border ${nameBorderClass} bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 flex items-center gap-2 font-semibold text-slate-50"
            >
              <AtSign size={16} className="text-violet-500" />
              <span>Email</span>
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={() => setTouched({ ...touched, email: true })}
              className={`w-full rounded-md border ${emailBorderClass} bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none`}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 flex items-center gap-2 font-semibold text-slate-50"
            >
              <Mail size={16} className="text-violet-500" />
              <span>Message</span>
            </label>

            <textarea
              id="message"
              placeholder="Tell us about your project or learning goals!"
              value={formData.message}
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              onBlur={() => setTouched({ ...touched, message: true })}
              className={`min-h-32 w-full rounded-md border ${messageBorderClass} bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none`}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSending}
            className="w-full rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send message"}
          </button>
          <p className="text-center text-sm text-slate-500">
            {feedbackMessage}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
