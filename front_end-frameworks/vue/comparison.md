# React vs Vue.js : analyse comparative

Ce document compare l'implémentation React et l'implémentation Vue.js de l'application Agentic AI, développées dans le cadre du curriculum Holberton School Front-end Frameworks. Les exemples cités proviennent directement des deux projets.

## Components

### Comment un composant React est créé

En React, un composant est une fonction JavaScript qui retourne du JSX (une syntaxe qui ressemble à du HTML mais qui est en réalité transformée en JavaScript). Le composant d'origine `Brand.jsx` illustre ce principe :

```jsx
function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-violet-500 p-2 text-slate-50 shadow-lg shadow-violet-500/40">
        <BrainCircuit />
      </div>
      <span className="font-bold text-slate-50">Agentic AI</span>
    </div>
  );
}
export default Brand;
```

La logique et le rendu sont combinés dans la même fonction. Tout est du JavaScript, et les balises JSX servent à décrire la structure HTML à l'intérieur de ce code.

### Comment un composant Vue est créé

En Vue, un composant est un fichier `.vue`, appelé Single File Component (SFC). Il sépare le code en blocs distincts : `<script setup>` pour la logique et `<template>` pour le rendu HTML. Le composant migré `AppBrand.vue` illustre cette structure :

```vue
<script setup>
import { BrainCircuit } from "lucide-vue-next";
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      class="rounded-lg bg-violet-500 p-2 text-slate-50 shadow-lg shadow-violet-500/40"
    >
      <BrainCircuit />
    </div>
    <span class="font-bold text-slate-50">Agentic AI</span>
  </div>
</template>
```

Il n'y a pas de fonction à écrire, pas de `return`, et pas d'`export default` explicite. Le fichier entier constitue le composant.

### Similarités

Dans les deux frameworks, un composant est une unité réutilisable qui encapsule à la fois de la logique et un rendu visuel, et qui peut être importée et utilisée ailleurs comme une balise. Les deux approches permettent la composition, c'est-à-dire l'assemblage de petits composants pour construire une interface plus large. Cela se voit dans `AppHeader.vue`, qui importe et utilise à la fois `AppBrand` et `BaseButton`.

### Différences

La principale différence est la séparation physique du code. React mélange logique et rendu à l'intérieur d'une seule fonction JavaScript, et le HTML n'est distingué que par la syntaxe JSX. Vue impose une séparation visuelle stricte entre la logique et le rendu, ce qui facilite le repérage rapide de l'emplacement du HTML, au prix d'une légère verbosité supplémentaire liée aux balises `<script>` et `<template>`.

Une autre différence, découverte pendant la migration, concerne le nommage des fichiers. Le plugin ESLint pour Vue (`eslint-plugin-vue`) impose la règle `vue/multi-word-component-names`, qui exige que les noms de composants soient composés d'au moins deux mots, afin d'éviter tout conflit avec de futures balises HTML natives. C'est pourquoi des composants comme `Header.jsx` ou `Button.jsx` ont été renommés en `AppHeader.vue` et `BaseButton.vue` lors de la migration. React n'impose aucune contrainte de ce type sur les noms de fichiers.

## Templates

### JSX

JSX permet d'écrire des balises qui ressemblent à du HTML directement dans du code JavaScript. Ce n'est pas du HTML réel : c'est transformé par un compilateur en appels de fonction JavaScript. N'importe quelle expression JavaScript peut être injectée avec `{...}`, comme dans `SectionTitle.jsx` :

```jsx
<h2 className={`text-center text-4xl leading-none font-black tracking-tight md:text-5xl ${className}`}>
```

### Vue templates

Le `<template>` de Vue n'est pas du JavaScript : c'est un langage de template dédié, avec sa propre syntaxe et ses propres directives (`v-if`, `v-for`, `:attribut`, `{{ }}`). Il est compilé séparément vers du code de rendu optimisé. Il n'est pas possible d'y écrire n'importe quelle instruction JavaScript classique (pas de boucle `for`, pas de `if/else` classique) : seules des expressions sont autorisées, à travers les directives dédiées.

### Avantages et inconvénients de chaque approche

JSX a l'avantage d'être très flexible, puisqu'il s'agit de JavaScript à part entière : il permet d'utiliser toute la puissance du langage (fonctions, conditions complexes, `.map()`) sans apprendre de nouvelle syntaxe. L'inconvénient est que cette flexibilité peut rendre le template moins lisible lorsque la logique devient complexe, et qu'il faut connaître les subtilités propres à JSX, comme `className` à la place de `class`.

Le template Vue a l'avantage d'être plus proche du HTML classique, donc plus lisible et plus accessible pour quelqu'un qui maîtrise le HTML/CSS sans forcément connaître JavaScript en profondeur. Il impose également une structure plus prévisible. L'inconvénient est qu'il faut apprendre un ensemble de directives spécifiques à Vue (`v-if`, `v-for`, `v-bind`, `v-model`) qui n'existent pas en HTML natif.

### Observation personnelle

En travaillant sur les deux versions du projet, il apparaît que dire que Vue est simplement "plus simple" que React est une simplification excessive. Les deux frameworks sont plus accessibles selon un profil de développeur différent. Vue est plus facile à aborder pour quelqu'un qui vient du HTML/CSS et qui n'est pas encore parfaitement à l'aise avec JavaScript, car son template se lit presque comme des phrases (`v-if`, `v-for`, `v-model`) et évite certains pièges, comme celui du `0` qui s'affiche par erreur avec l'opérateur `&&` en React. En revanche, ce confort a un coût : Vue introduit tout un vocabulaire de directives propre au framework (`v-bind`, `v-on`, `computed`, la distinction `.value`) qui doit être appris en plus du HTML/CSS/JS classique. React, à l'inverse, reste entièrement du JavaScript standard : quelqu'un qui maîtrise déjà `.map()`, les opérateurs ternaires ou `&&` n'a aucune nouvelle syntaxe à apprendre, seulement une nouvelle façon de les utiliser à l'intérieur du JSX. Vue est donc plus simple pour découvrir le développement front-end en partant du HTML, tandis que React est plus naturel pour quelqu'un déjà à l'aise en JavaScript.

## Props

### React props

En React, les props sont reçues comme paramètre de la fonction composant, généralement déstructuré directement. `Button.jsx` illustre ce fonctionnement :

```jsx
function Button({ variant = "primary", href, external = false, children }) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-50";
  const variantClasses =
    variant === "primary"
      ? "bg-violet-500 shadow-lg shadow-violet-500/40 hover:bg-violet-600"
      : "border border-slate-800 bg-slate-950 hover:bg-slate-900";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      className={baseClasses + " " + variantClasses}
    >
      {children}
    </a>
  );
}
```

Les valeurs par défaut se déclarent directement dans la déstructuration (`variant = "primary"`), et il n'existe pas de validation de type native sans passer par TypeScript ou une bibliothèque externe comme PropTypes.

### Vue props

En Vue, les props se déclarent explicitement avec `defineProps`, en précisant leur type, si elles sont requises, et leur valeur par défaut. Le composant migré `BaseButton.vue` illustre cette approche :

```vue
<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
});
</script>
```

Dans le `<template>`, les props sont accessibles directement par leur nom, sans préfixe. Dans le `<script setup>`, elles doivent être lues via l'objet retourné par `defineProps` (`props.variant`).

### Similarités et différences

Dans les deux frameworks, les props permettent de transmettre des données d'un composant parent vers un composant enfant, de manière unidirectionnelle (top-down). Les deux permettent de définir des valeurs par défaut.

La différence principale est le niveau de validation intégré. Vue valide nativement le type de chaque prop et peut la rendre obligatoire (`required: true`), avec un avertissement dans la console si la prop transmise ne correspond pas. React ne fait cette validation que si TypeScript ou PropTypes est ajouté au projet, ce qui n'était pas le cas ici. La déclaration Vue est donc plus verbeuse, mais plus explicite et davantage auto-documentée.

## State management

### React state management

React gère l'état local avec le hook `useState`, qui retourne une paire : la valeur actuelle et une fonction dédiée pour la modifier. Dans `Contact.jsx` :

```jsx
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  message: "",
});
```

Toute modification de l'état passe obligatoire par la fonction `setFormData`, jamais par une modification directe de la variable.

### Vue reactive state

Vue utilise la fonction `ref()` pour créer une valeur réactive. Elle retourne un objet unique possédant une propriété `.value`. Dans `ContactSection.vue` :

```vue
<script setup>
import { ref } from "vue";

const formData = ref({
  fullName: "",
  email: "",
  message: "",
});
</script>
```

La modification se fait par réassignation directe de `.value` (`formData.value = {...}`), ou même par modification d'une propriété interne (`touched.value.fullName = true`), sans fonction dédiée. Dans le `<template>`, le `.value` disparaît automatiquement : on écrit simplement `formData`.

Vue propose également `computed()`, utilisé abondamment dans `ContactSection.vue` pour dériver des valeurs à partir de l'état, par exemple la validation d'un champ :

```js
const isNameValid = computed(() => formData.value.fullName.length >= 2);
```

Cette fonction est nécessaire en Vue car le `<script setup>` ne s'exécute qu'une seule fois, contrairement à un composant React qui se réexécute entièrement à chaque changement de state. Sans `computed`, une valeur dérivée calculée une seule fois ne se mettrait jamais à jour.

### Observation personnelle

Ce concept a été le plus difficile à intégrer de toute la migration. La distinction entre `ref` et `.value` semblait au départ être un simple détail syntaxique, mais elle repose en fait sur une vraie différence de fonctionnement entre les deux frameworks : React rejoue tout le composant à chaque changement, alors que Vue ne l'exécute qu'une fois et doit donc suivre explicitement quelles valeurs sont réactives. Comprendre pourquoi `.value` est nécessaire dans le `<script setup>` mais disparaît dans le `<template>`, et pourquoi `computed` est indispensable pour les valeurs dérivées comme `isFormValid`, a demandé plusieurs explications et plusieurs relectures du composant `ContactSection.vue` avant d'être réellement clair.

### Similarités et différences

Dans les deux frameworks, l'état local déclenche automatiquement une mise à jour du rendu lorsqu'il change. La différence principale est le mécanisme : React sépare la lecture (la valeur) et l'écriture (la fonction `setX`), tandis que Vue unifie les deux dans un seul objet réactif accessible via `.value`. React recalcule automatiquement toute valeur dérivée à chaque rendu, car le composant entier est une fonction rejouée en boucle, alors que Vue nécessite `computed()` pour obtenir ce même comportement automatique, en raison de son modèle d'exécution unique au montage.

## Lifecycle

### React lifecycle logic

React gère les effets de bord et la logique de cycle de vie avec `useEffect`. Un tableau de dépendances vide `[]` signifie que l'effet ne s'exécute qu'une seule fois, après le premier rendu. Dans `Insights.jsx` :

```jsx
useEffect(() => {
  async function fetchInsights() {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      setError("Failed to load insights.");
    }
  }
  fetchInsights();
}, []);
```

### Vue lifecycle logic

Vue propose des fonctions de cycle de vie dédiées, comme `onMounted`, qui expriment directement l'intention sans tableau de dépendances à gérer. Dans `InsightsSection.vue` :

```vue
<script setup>
import { onMounted, ref } from "vue";

onMounted(async () => {
  try {
    const data = await getInsights();
    insights.value = data;
  } catch {
    error.value = "Failed to load insights.";
  }
});
</script>
```

### Similarités et différences

Dans les deux cas, l'objectif est d'exécuter du code au moment où le composant apparaît à l'écran, typiquement pour déclencher un appel réseau ou un chargement de données. La différence est la manière d'exprimer cette intention : React réutilise un hook générique (`useEffect`) dont le comportement dépend de la valeur du tableau de dépendances passé en second argument, ce qui peut être une source d'erreurs fréquentes chez les débutants (oublier une dépendance, ou se tromper sur le tableau vide). Vue propose des fonctions nommées explicitement pour chaque moment du cycle de vie (`onMounted`, `onUpdated`, `onUnmounted`), ce qui rend l'intention plus lisible sans piège de configuration.

## Conditional rendering

### React conditional rendering

React utilise des expressions JavaScript standards pour le rendu conditionnel, le plus souvent l'opérateur `&&` ou l'opérateur ternaire, directement dans le JSX. Dans `Contact.jsx` :

```jsx
{
  error && <p className="text-red-400">{error}</p>;
}
```

### Vue conditional rendering

Vue utilise des directives dédiées au rendu conditionnel : `v-if`, `v-else-if` et `v-else`, posées directement sur la balise concernée. Dans `ContactSection.vue` :

```vue
<p v-if="error" class="text-red-400">{{ error }}</p>
```

### Similarités et différences

Dans les deux cas, un élément n'est inséré dans le DOM que si une condition est vraie. La différence est syntaxique : React réutilise les opérateurs natifs de JavaScript, ce qui demande de connaître certains pièges (par exemple, `{count && <p>...}` peut afficher `0` à l'écran si `count` vaut zéro, car `0` est une valeur affichable en JSX). Vue utilise des directives dédiées et explicites, qui éliminent ce genre de piège car `v-if` évalue la condition comme un booléen strict.

### Observation personnelle

Comprendre ce que fait `&&` conceptuellement a été assez rapide, mais apprendre à le lire correctement a demandé plus de temps. La difficulté n'était pas de comprendre "si error est vrai, alors affiche le message", mais de voir que `error` apparaît deux fois dans la même ligne avec deux rôles différents : une première fois comme condition, une seconde fois comme contenu affiché dans le `<p>`. La syntaxe `v-if="error"` de Vue évite cette ambiguïté, puisque la condition et le contenu affiché sont clairement séparés.

## Dynamic rendering

### React dynamic rendering

React génère des listes dynamiques avec la méthode native `.map()`, qui retourne un tableau d'éléments JSX. Une prop `key` unique doit être fournie pour aider React à identifier chaque élément. Dans `Hero.jsx` :

```jsx
{
  stats.map((stat) => {
    return <StatCard key={stat.label} value={stat.value} label={stat.label} />;
  });
}
```

### Vue dynamic rendering

Vue utilise la directive `v-for`, posée directement sur la balise à répéter, associée à `:key` pour la même raison d'identification unique. Dans `HeroSection.vue` :

```vue
<StatCard
  v-for="stat in stats"
  :key="stat.label"
  :value="stat.value"
  :label="stat.label"
/>
```

Vue permet également d'accéder à l'index de l'élément avec la syntaxe `(élément, index)`, utilisée dans `FeaturesSection.vue` :

```vue
<FeatureCard
  v-for="(feature, index) in features"
  :key="index"
  :icon="feature.icon"
  :title="feature.title"
  :description="feature.description"
/>
```

### Similarités et différences

Les deux approches nécessitent une clé unique par élément afin d'optimiser les mises à jour du DOM. La différence est que React réutilise une méthode JavaScript générique (`.map()`), qui doit être placée à l'intérieur d'une expression `{...}` du JSX, alors que Vue propose une directive dédiée (`v-for`) directement intégrée à la syntaxe du template, sans avoir besoin d'écrire une fonction de callback.

## Forms

### React form management

React gère les formulaires avec des composants contrôlés : chaque champ reçoit sa valeur depuis le state (`value={...}`) et met à jour ce state à chaque frappe via un gestionnaire d'événement (`onChange`). Dans `Contact.jsx` :

```jsx
<input
  value={formData.fullName}
  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
  onBlur={() => setTouched({ ...touched, fullName: true })}
/>
```

La soumission du formulaire nécessite d'appeler explicitement `e.preventDefault()` pour empêcher le rechargement de la page par défaut du navigateur.

### Vue form management

Vue simplifie la liaison de formulaire avec la directive `v-model`, qui combine automatiquement la lecture de la valeur et sa mise à jour en une seule directive. Dans `ContactSection.vue` :

```vue
<input v-model="formData.fullName" @blur="touched.fullName = true" />
```

Pour la soumission, Vue propose un modificateur intégré, `.prevent`, qui applique automatiquement `preventDefault()` sans avoir à l'écrire dans la fonction :

```vue
<form @submit.prevent="handleSubmit">
```

### Similarités et différences

Les deux frameworks gèrent les formulaires de façon contrôlée, c'est-à-dire que la valeur affichée dans le champ provient toujours de l'état de l'application, jamais du DOM directement. La différence principale est la quantité de code nécessaire : React demande d'écrire manuellement le gestionnaire `onChange` et de reconstruire l'objet d'état à chaque frappe (`{...formData, fullName: e.target.value}`), tandis que `v-model` fait cela automatiquement en une seule directive. De la même façon, Vue propose des modificateurs d'événements intégrés comme `.prevent`, alors que React nécessite d'appeler `e.preventDefault()` explicitement dans le code de la fonction.

## Events

### React event handling

React utilise des props spéciales, préfixées par `on` et en camelCase, pour attacher des gestionnaires d'événements : `onClick`, `onChange`, `onBlur`, `onSubmit`. Elles reçoivent une fonction JavaScript, souvent une fonction fléchée inline. Exemple tiré de `Contact.jsx` :

```jsx
<input onBlur={() => setTouched({ ...touched, fullName: true })} />
```

### Vue event handling

Vue utilise la syntaxe `@evenement` (raccourci de `v-on:evenement`), suivie directement d'une expression JavaScript ou du nom d'une fonction. Exemple tiré de `ContactSection.vue` :

```vue
<input @blur="touched.fullName = true" />
```

### Similarités et différences

Dans les deux cas, un événement du DOM déclenche l'exécution d'une fonction JavaScript définie dans le composant. La différence est syntaxique et de convention : React conserve la convention camelCase des props JSX (`onClick`), tandis que Vue introduit une syntaxe dédiée avec le préfixe `@` (`@click`), directement inspirée du HTML natif où les événements s'écrivent en minuscules. Vue permet également d'écrire une expression courte directement dans l'attribut, sans obligatoirement créer une fonction séparée, comme le montre `@blur="touched.fullName = true"`.

## Project organization

### React project structure

Le projet React organise ses fichiers ainsi :

```
src/
├── App.jsx
├── main.jsx
├── global.css
├── components/
│   ├── cards/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
└── services/
```

### Vue project structure

Le projet Vue reprend une structure quasiment identique :

```
src/
├── App.vue
├── main.js
├── global.css
├── components/
│   ├── cards/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
└── services/
```

### Similarités et différences

Les deux projets partagent la même organisation logique par dossiers (`cards`, `layout`, `sections`, `ui`, `data`, `services`), ce qui a facilité la migration composant par composant sans avoir à repenser l'architecture globale. La seule différence structurelle vient de l'extension des fichiers de composants (`.jsx` contre `.vue`) et du point d'entrée (`main.jsx` contre `main.js`), ainsi que du renommage de certains composants pour respecter la convention Vue imposant des noms multi-mots.

### Observation personnelle

Un aspect de l'organisation du projet qui dépasse la seule structure de dossiers concerne le déploiement. Les deux projets, React et Vue, cohabitent dans le même dépôt monorepo, sous `front_end-frameworks/react` et `front_end-frameworks/vue`. Or, GitHub Pages ne permet qu'un seul site actif par dépôt, construit à partir d'une seule branche `gh-pages`. Organiser correctement le déploiement a donc demandé de publier chaque projet dans un sous-dossier distinct de cette branche unique, plutôt qu'à sa racine, afin que les deux applications restent accessibles simultanément sans que l'une n'écrase l'autre.

## AI-assisted migration

### Outils IA utilisés

Claude a été utilisé tout au long de la migration, à la fois pour convertir progressivement chaque fichier React vers son équivalent Vue et pour expliquer les concepts sous-jacents à chaque étape (props, state, cycle de vie, directives de template).

### Ce qui a bien fonctionné

La conversion des composants simples, sans état ni logique complexe (`SectionBadge`, `StatCard`, les fichiers de données), s'est faite très rapidement, car il s'agissait essentiellement de remplacer `className` par `class` et de restructurer le fichier en blocs `<script>` et `<template>`. La correspondance directe entre les concepts (props, `v-for`, `v-if`) a également permis de comprendre rapidement la logique de traduction d'un framework à l'autre.

### Ce qui a nécessité des corrections manuelles

Le remplacement des icônes de réseaux sociaux a demandé une recherche complémentaire, car `lucide-vue-next` ne propose pas de logos de marques (Instagram, TikTok, X, YouTube), une politique volontaire de la bibliothèque Lucide. Il a fallu identifier et installer un paquet équivalent à `react-bootstrap-icons` côté Vue (`bootstrap-icons-vue`), et vérifier manuellement, directement dans les fichiers du paquet installé, le nom exact des composants disponibles (`BIconInstagram`, `BIconTiktok`, `BIconTwitterX`, `BIconYoutube`).

Le déploiement sur GitHub Pages a également nécessité une correction manuelle, découverte en cours de projet plutôt qu'anticipée : la configuration initiale du script `deploy` publiait le contenu à la racine de la branche `gh-pages`, ce qui a écrasé le déploiement du projet React déjà en ligne. L'erreur a été identifiée immédiatement après le premier déploiement du projet Vue, en constatant que le lien du projet React ne fonctionnait plus. La correction, proposée par le SWE encadrant le projet, a consisté à publier chaque projet dans un sous-dossier dédié (`front_end-frameworks/react` et `front_end-frameworks/vue`), grâce aux options `--dest` et `--add` du paquet `gh-pages`, afin que les deux applications coexistent sur la même branche sans se supprimer mutuellement. Le projet React a ensuite dû être redéployé une fois avec la nouvelle configuration pour restaurer son accès public.

Un autre point a demandé une décision manuelle plutôt qu'une simple traduction de code : le choix du paquet d'icônes. L'énoncé demande explicitement `lucide-vue-next`, mais ce paquet est annoncé comme déprécié par npm au profit de `@lucide/vue`. Le projet avait initialement été configuré avec `@lucide/vue`, avant de revenir consciemment sur `lucide-vue-next` pour respecter la consigne du sujet, malgré l'avertissement de dépréciation. Ce choix illustre qu'une migration assistée par IA ne se limite pas à convertir du code : elle implique aussi d'arbitrer entre une recommandation technique actuelle et une contrainte imposée par l'énoncé.

De la même manière, la bibliothèque `lucide-vue-next` ne fournit aucune icône de marque (Instagram, TikTok, X, YouTube), Lucide excluant volontairement les logos de marques de son catalogue. Cette limitation existait déjà côté React, où le projet utilisait `react-bootstrap-icons` en complément pour ces icônes spécifiques. La migration a nécessité de retrouver l'équivalent Vue de cette bibliothèque (`bootstrap-icons-vue`) et de vérifier manuellement, directement dans les fichiers du paquet installé, le nom exact des composants exportés, la documentation en ligne ne les listant pas explicitement.

Enfin, le respect strict de la règle ESLint `vue/multi-word-component-names` a nécessité de renommer plusieurs composants après leur création initiale (`Header` en `AppHeader`, `Button` en `BaseButton`, etc.), ce qui n'avait pas de contrainte équivalente côté React.

### Leçons retenues du processus de migration

La migration a permis de constater que les deux frameworks résolvent des problèmes similaires avec des philosophies différentes : React reste proche de JavaScript pur et laisse le développeur composer avec les outils du langage, tandis que Vue introduit davantage de conventions et de syntaxe dédiée, ce qui réduit la quantité de code à écrire pour des tâches courantes (formulaires avec `v-model`, listes avec `v-for`) au prix de l'apprentissage de nouvelles directives. L'utilisation d'un assistant IA a accéléré la conversion mécanique du code, mais la compréhension de chaque concept (notamment la différence entre `useState`/`ref` et `useEffect`/`onMounted`) a nécessité des explications supplémentaires et plusieurs relectures pour être réellement acquise, plutôt que simplement recopiée.
