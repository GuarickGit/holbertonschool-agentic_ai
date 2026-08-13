<script>
  import steps from "../../data/steps.js";
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
</script>

<section id="about-section" class="flex flex-col gap-8 bg-black py-24">
  <div class="mx-auto max-w-6xl px-6">
    <div class="flex flex-col items-center gap-4">
      <SectionBadge>✦ What is Agentic AI ✦</SectionBadge>
      <SectionTitle
        line1="AI that does more than answer"
        line2="It acts with purpose"
        className="pt-4"
      />
      <p class="mt-4 max-w-2xl pb-18 text-sm text-slate-300 md:text-base">
        Agentic AI refers to artificial intelligence systems designed to pursue
        goals, make decisions, use tools, and adapt their actions across
        multiple steps. Instead of only responding to a single prompt, an AI
        agent can break down a task, plan a strategy, execute actions, evaluate
        results, and continue until the objective is reached.
      </p>
    </div>
    <div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      <div
        class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
      >
        <div>
          <p class="pb-2 font-bold text-slate-50">Traditional AI</p>
          <p class="text-slate-500">
            Responds to direct instructions, generates content, answers
            questions, or analyzes information within a limited interaction.
          </p>
        </div>
        <hr class="my-4 border-slate-800" />
        <div>
          <p class="pb-2 font-bold text-violet-300">Agentic AI</p>
          <p class="text-slate-500">
            Understands a goal, chooses actions, uses external tools, follows a
            plan, and adjusts its behavior based on feedback.
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        {#each steps as step (step.number)}
          <div class="flex gap-4">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 font-bold text-slate-50"
            >
              {step.number}
            </div>
            <div>
              <p class="font-semibold text-slate-50">{step.title}</p>
              <p class="text-sm text-slate-300">{step.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
