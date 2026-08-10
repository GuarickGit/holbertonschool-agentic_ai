<script setup>
import { ref, computed } from "vue";
import {
  ArrowRight,
  AtSign,
  FolderKanban,
  Mail,
  User,
  Users,
  Sparkles,
} from "lucide-vue-next";
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import Button from "../ui/BaseButton.vue";

const formData = ref({
  fullName: "",
  email: "",
  message: "",
});

const touched = ref({
  fullName: false,
  email: false,
  message: false,
});

const isSending = ref(false);
const feedbackMessage = ref("Please fill all required fields.");

const isNameValid = computed(() => formData.value.fullName.length >= 2);
const isEmailValid = computed(
  () =>
    formData.value.email.includes("@") && formData.value.email.includes("."),
);
const isMessageValid = computed(() => formData.value.message.length >= 10);
const isFormValid = computed(
  () => isNameValid.value && isEmailValid.value && isMessageValid.value,
);

const nameBorderClass = computed(() =>
  !touched.value.fullName
    ? "border-slate-800"
    : isNameValid.value
      ? "border-violet-500"
      : "border-red-500",
);

const emailBorderClass = computed(() =>
  !touched.value.email
    ? "border-slate-800"
    : isEmailValid.value
      ? "border-violet-500"
      : "border-red-500",
);

const messageBorderClass = computed(() =>
  !touched.value.message
    ? "border-slate-800"
    : isMessageValid.value
      ? "border-violet-500"
      : "border-red-500",
);

async function handleSubmit() {
  isSending.value = true;
  feedbackMessage.value = "Sending message...";

  await new Promise((resolve) => setTimeout(resolve, 1500));

  feedbackMessage.value = "Your message has been sent successfully.";

  formData.value = {
    fullName: "",
    email: "",
    message: "",
  };

  touched.value = {
    fullName: false,
    email: false,
    message: false,
  };

  isSending.value = false;

  setTimeout(() => {
    feedbackMessage.value = "Please fill all required fields.";
  }, 3000);
}
</script>

<template>
  <section
    id="contact-section"
    class="relative isolate overflow-hidden border-b border-slate-800 py-24"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10"
      :style="{
        background:
          'radial-gradient(ellipse 70% 60% at 15% 10%, rgba(139, 92, 246, 0.35), transparent), radial-gradient(ellipse 70% 60% at 85% 90%, rgba(59, 130, 246, 0.25), transparent)',
      }"
    />
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-size-[72px_72px] opacity-30"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-black"
    />

    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
      <SectionBadge>✦ Start your AI journey ✦</SectionBadge>

      <SectionTitle line1="Ready to Explore" line2="Agentic AI?" />

      <div class="flex flex-col items-center gap-4 py-10 md:flex-row">
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

      <div class="flex flex-wrap justify-center gap-6">
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <FolderKanban :size="16" class="text-violet-500" />
          <span>Project-based learning</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-slate-500">
          <Users :size="16" class="text-violet-500" />
          <span>Peer learning environment</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-slate-500">
          <Sparkles :size="16" class="text-violet-500" />
          <span>AI-powered workflows</span>
        </div>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="w-full max-w-2xl space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40"
      >
        <div>
          <label
            for="fullName"
            class="mb-2 flex items-center gap-2 font-semibold text-slate-50"
          >
            <User :size="16" class="text-violet-500" />
            <span>Full Name</span>
          </label>

          <input
            id="fullName"
            type="text"
            placeholder="Your full name..."
            v-model="formData.fullName"
            autocomplete="off"
            @blur="touched.fullName = true"
            :class="`w-full rounded-md border ${nameBorderClass} bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none`"
          />
        </div>

        <div>
          <label
            for="email"
            class="mb-2 flex items-center gap-2 font-semibold text-slate-50"
          >
            <AtSign :size="16" class="text-violet-500" />
            <span>Email</span>
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            v-model="formData.email"
            autocomplete="off"
            @blur="touched.email = true"
            :class="`w-full rounded-md border ${emailBorderClass} bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none`"
          />
        </div>

        <div>
          <label
            for="message"
            class="mb-2 flex items-center gap-2 font-semibold text-slate-50"
          >
            <Mail :size="16" class="text-violet-500" />
            <span>Message</span>
          </label>

          <textarea
            id="message"
            placeholder="Tell us about your project or learning goals!"
            v-model="formData.message"
            autocomplete="off"
            @blur="touched.message = true"
            :class="`min-h-32 w-full rounded-md border ${messageBorderClass} bg-black px-4 py-2 text-slate-50 placeholder:text-slate-500 focus:outline-none`"
          />
        </div>

        <button
          type="submit"
          :disabled="!isFormValid || isSending"
          class="w-full rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isSending ? "Sending..." : "Send message" }}
        </button>
        <p class="text-center text-sm text-slate-500">
          {{ feedbackMessage }}
        </p>
      </form>
    </div>
  </section>
</template>
