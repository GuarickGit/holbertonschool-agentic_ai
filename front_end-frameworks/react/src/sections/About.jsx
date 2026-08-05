import steps from "../data/steps";

function About() {
  return (
    <section id="about-section" className="flex flex-col gap-8 bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Eyebrow */}
          <p className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
            ♦ What is Agentic AI? ♦
          </p>

          {/* Title */}
          <h2 className="pt-4 text-center text-4xl leading-none font-black tracking-tight md:text-5xl">
            <span className="text-slate-50">AI that does more than answer</span>
            <br />
            <span className="text-violet-300">It acts with purpose</span>
          </h2>

          {/* Introduction */}
          <p className="mt-4 max-w-2xl pb-10 text-sm text-slate-300 md:text-base">
            Agentic AI refers to artificial intelligence systems designed to
            pursue goals, make decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single
            prompt, an AI agent can break down a task, plan a strategy, execute
            actions, evaluate results, and continue until the objective is
            reached.
          </p>
        </div>

        {/* Traditional AI vs Agentic AI */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
            <div>
              <p className="pb-2 font-bold text-slate-50">Traditional AI</p>
              <p className="text-slate-500">
                Responds to direct instructions, generates content, answers
                questions, or analyzes information within a limited interaction.
              </p>
            </div>
            <hr className="my-4 border-slate-800" /> {/* Separation */}
            <div>
              <p className="pb-2 font-bold text-violet-300">Agentic AI</p>
              <p className="text-slate-500">
                Understands a goal, chooses actions, uses external tools,
                follows a plan, and adjusts its behavior based on feedback.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step) => {
              return (
                <div key={step.number} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500 font-bold text-slate-50">
                    {step.number}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50">{step.title}</p>
                    <p className="text-slate-300">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
