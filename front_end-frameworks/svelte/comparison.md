# Comparaison React / Vue.js / Svelte

## Analyse globale

Après avoir migré la même application vers trois frameworks différents (React, Vue.js, puis Svelte), une chose devient évidente : les trois résolvent exactement les mêmes problèmes (découpage en composants, gestion de données, rendu dynamique, formulaires, navigation), mais avec des philosophies de plus en plus différentes sur la façon dont ce code doit s'écrire et s'exécuter.

React reste le plus explicite des trois : chaque composant est une fonction JavaScript qui retourne du JSX, chaque mise à jour d'état passe obligatoirement par un setter (`useState`), et rien ne se produit sans que ce soit écrit noir sur blanc dans le code. Vue.js introduit une couche déclarative avec ses directives (`v-for`, `v-if`, `v-model`) et un système de réactivité automatique basé sur des proxys JavaScript (`ref`, `computed`). Svelte va encore plus loin dans cette direction déclarative, mais change surtout de mécanisme sous le capot : plutôt que d'exécuter un moteur de réactivité dans le navigateur à chaque rendu, Svelte analyse le code au moment de la compilation et génère directement le JavaScript nécessaire pour mettre à jour le DOM réel, sans Virtual DOM et sans moteur de réactivité embarqué dans le bundle final.

Cette différence architecturale a une conséquence concrète que j'ai pu observer sur mon propre projet : après le build de production, le bundle JavaScript du projet Svelte (`index-DNuhraVx.js`, 79,50 kB, soit environ 28 kB gzippé) reste comparable en taille à celui du projet Vue pour un nombre de composants et de fonctionnalités identique, alors que Svelte n'embarque quasiment aucun runtime, contrairement à React et Vue qui doivent inclure leur moteur de réactivité dans le bundle final.

Les concepts qui reviennent, sous une forme ou une autre, dans les trois frameworks sont : la notion de composant comme unité réutilisable et isolée, les props pour faire descendre des données d'un parent vers un enfant en lecture seule, un mécanisme d'état local propre à chaque composant, une syntaxe dédiée pour le rendu conditionnel et le rendu de liste, un système de gestion des événements DOM, et une méthode pour exécuter du code au moment où un composant apparaît à l'écran.

Les différences les plus marquantes entre les trois se situent à trois niveaux : la syntaxe du template (JSX intégré au JavaScript pour React, balise `<template>` séparée pour Vue, HTML étendu sans balise englobante pour Svelte), le mécanisme de réactivité (état immuable avec setters pour React, proxys automatiques pour Vue, compilation statique pour Svelte), et la quantité de code nécessaire pour exprimer la même intention, Svelte étant systématiquement le plus concis des trois sur les patterns que j'ai eu à migrer.

## Composants Svelte

Un composant Svelte est un fichier `.svelte` unique, qui contient un bloc `<script>` optionnel suivi directement du template HTML, sans balise englobante et sans export explicite. C'est le point qui m'a le plus surpris en démarrant la migration, en particulier sur le composant le plus simple du projet, `Brand.svelte` :

```jsx
// React : Brand.jsx
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

```svelte
<!-- Svelte : Brand.svelte -->
<script>
  import { BrainCircuit } from "@lucide/svelte";
</script>

<div class="flex items-center gap-2">
  <div
    class="rounded-lg bg-violet-500 p-2 text-slate-50 shadow-lg shadow-violet-500/40"
  >
    <BrainCircuit />
  </div>
  <span class="font-bold text-slate-50">Agentic AI</span>
</div>
```

En React, il faut une fonction qui retourne du JSX, puis un `export default` explicite à la fin du fichier. En Svelte, le fichier entier est directement le composant : tout ce qui est déclaré dans le `<script>` devient automatiquement accessible dans le template, sans qu'il soit nécessaire de le retourner ou de l'exporter.

Par rapport à Vue, où `<script setup>` supprime déjà le besoin d'un `export default` explicite mais impose toujours une balise `<template>` autour du HTML (`<template><div class="...">...</div></template>`), Svelte va encore plus loin en supprimant aussi cette balise englobante. Le HTML placé après le `</script>` est directement interprété comme le template du composant, sans wrapper d'aucune sorte.

Ce qui m'a semblé plus simple avec Svelte : le fichier est visuellement plus court que son équivalent React ou Vue pour un rendu strictement identique, car il n'y a aucune structure de conteneur à écrire ni de mot-clé de déclaration de composant. Ce qui m'a semblé plus surprenant, à l'inverse : l'absence totale de signal explicite indiquant "ceci est un composant" peut donner l'impression, au premier abord, d'écrire simplement du HTML augmenté plutôt qu'une véritable unité de composant, ce qui demande un temps d'adaptation par rapport à la structure très explicite de React.

## Templates et syntaxe

Le template Svelte ressemble davantage à du HTML enrichi qu'à du JSX ou qu'à un template Vue classique. Il n'impose pas de balise racine unique (contrairement à React historiquement, où un composant devait retourner un seul élément parent), et les attributs restent proches du HTML standard : `class` au lieu de `className`, `for` au lieu de `htmlFor`. Ce changement s'est retrouvé de façon quasi mécanique sur l'ensemble des fichiers migrés, par exemple dans `Header.svelte` :

```jsx
// React
<a href="#about-section" className="hidden gap-6 text-sm text-slate-500">
```

```svelte
<!-- Svelte -->
<a href="#about-section" class="hidden gap-6 text-sm text-slate-500">
```

La différence la plus concrète avec JSX apparaît dans les expressions dynamiques utilisées à l'intérieur des attributs. En React, `className={variantClasses}` fonctionne car JSX accepte n'importe quelle expression JavaScript entre accolades, y compris une simple variable calculée par ailleurs. En Svelte, la syntaxe visuelle est identique (`class={variantClasses}`), mais la valeur qui alimente cette expression doit obligatoirement être déclarée avec la rune `$derived` si elle dépend d'une prop réactive, sous peine d'un avertissement du compilateur. Ce point a été rencontré concrètement en écrivant `Button.svelte` : la première version, avec une simple `const variantClasses = variant === "primary" ? "..." : "..."`, a déclenché l'avertissement `state_referenced_locally`, corrigé en encapsulant le calcul dans `$derived(...)`.

Avec Vue, la comparaison est différente sur ce point précis : Vue sépare nettement la logique (`<script setup>`) du template (`<template>`), et les expressions dynamiques dans les attributs utilisent systématiquement un préfixe `:` (`:class="baseClasses + ' ' + variantClasses"`). Svelte n'a pas ce préfixe : les simples accolades suffisent, ce qui rapproche visuellement sa syntaxe de JSX plus que de Vue sur ce point, même si la structure générale du fichier (un seul fichier, une seule responsabilité) reste conceptuellement plus proche du Single File Component de Vue que du composant fonction de React.

L'avantage principal constaté en écrivant du Svelte a été la lisibilité générale du HTML produit : moins de bruit syntaxique autour des valeurs dynamiques que dans un fichier JSX chargé en accolades. La limite rencontrée concerne le contenu imbriqué transmis à un composant (voir section suivante), qui impose en Svelte 5 une syntaxe spécifique et moins intuitive au premier abord que le simple passage de JSX en React ou d'un `<slot />` en Vue.

## Props et flux de données

En Svelte 5, les props se récupèrent avec la rune `$props()`, déstructurée en une seule ligne en haut du bloc `<script>`. Cette syntaxe ressemble beaucoup à la déstructuration des paramètres de fonction en React, avec les mêmes valeurs par défaut possibles :

```jsx
// React
function Button({ variant = "primary", href, external = false, children }) {
```

```svelte
<!-- Svelte -->
<script>
  let { variant = "primary", href, external = false, children } = $props();
</script>
```

La vraie différence de fond apparaît avec le contenu imbriqué, c'est-à-dire ce qui est placé entre les balises ouvrante et fermante d'un composant. En React, `children` est une valeur directement affichable : `{children}`. En Vue, ce même besoin passe par `<slot />`. En Svelte 5, `children` est en réalité un snippet, c'est-à-dire une fonction de rendu, et il doit être explicitement exécuté avec `{@render children?.()}` :

```jsx
// React : SectionBadge.jsx
function SectionBadge({ children }) {
  return <p className="...">{children}</p>;
}
```

```svelte
<!-- Svelte : SectionBadge.svelte -->
<script>
  let { children } = $props();
</script>

<p class="...">{@render children?.()}</p>
```

Ce fonctionnement s'est retrouvé sur l'ensemble des composants acceptant du contenu, mais son cas le plus révélateur a été `SocialLink.svelte`, utilisé dans le `Footer`, où la prop `icon` n'est pas du texte mais un composant d'icône complet. En React, on passe simplement `icon={<Instagram />}` à l'appel. En Svelte, il faut déclarer un snippet nommé du même nom que la prop attendue :

```jsx
// React
<SocialLink icon={<Instagram />} label="Instagram" href="#" />
```

```svelte
<!-- Svelte -->
<SocialLink label="Instagram" href="#">
  {#snippet icon()}<Instagram />{/snippet}
</SocialLink>
```

Une erreur a d'ailleurs été commise pendant la migration sur ce point précis : au début, chaque contenu simple placé entre les balises d'un composant (comme le texte d'un `SectionBadge`) a été inutilement enveloppé dans `{#snippet children()}...{/snippet}`, alors que Svelte transforme automatiquement tout contenu direct en snippet `children` implicite. Cette erreur n'a été détectée que grâce à ESLint, qui a signalé la règle `svelte/no-useless-children-snippet` sur plusieurs fichiers (`Hero.svelte`, `About.svelte`, `Features.svelte`, `Insights.svelte`).

Ce qui reste conceptuellement identique dans les trois frameworks, malgré ces différences syntaxiques, c'est le principe général du flux de données : les props descendent toujours du composant parent vers le composant enfant en lecture seule, et un enfant ne doit jamais chercher à modifier directement une prop qu'il a reçue. Ce principe fondamental n'a pas changé d'un framework à l'autre, seule la mécanique syntaxique pour le respecter diffère.

## État et réactivité

C'est la section où la différence de philosophie entre les trois frameworks est la plus nette. En React, l'état se déclare avec `useState`, qui retourne une paire valeur/setter, et toute mise à jour doit obligatoirement passer par ce setter, avec une logique d'immutabilité stricte : on ne modifie jamais un objet existant, on en recrée systématiquement une copie.

```jsx
// React : Contact.jsx
const [touched, setTouched] = useState({ fullName: false, email: false, message: false });
// ...
onBlur={() => setTouched({ ...touched, fullName: true })}
```

Svelte 5 utilise la rune `$state()`, qui transforme une simple variable en valeur réactive. La mise à jour se fait par simple affectation, sans setter dédié :

```svelte
<!-- Svelte : Contact.svelte -->
<script>
  let touched = $state({ fullName: false, email: false, message: false });
</script>

<!-- ... -->
<input onblur={() => (touched.fullName = true)} />
```

Le point le plus surprenant rencontré ici concerne la profondeur de la réactivité : lorsque `$state()` enveloppe un objet, comme `formData` ou `touched` dans `Contact.svelte`, cet objet devient profondément réactif. Il devient alors possible de modifier directement une de ses propriétés (`touched.fullName = true`) sans avoir à recréer une copie complète de l'objet, contrairement à l'équivalent React (`setTouched({...touched, fullName: true})`). Cela a représenté une réduction concrète du code sur `Contact.svelte`, où les trois handlers `onblur` sont devenus des affectations directes d'une seule ligne, alors que leur équivalent React nécessitait systématiquement l'opérateur de décomposition sur l'objet entier.

Vue se situe à un point intermédiaire entre les deux : `ref()` encapsule une valeur dans un objet muni d'une propriété `.value`, et Vue traque automatiquement les dépendances pour recalculer les valeurs dérivées via `computed()`. Svelte, avec sa rune `$derived`, adopte une approche conceptuellement proche de `computed()` mais sans l'indirection du `.value`, ce qui a rendu l'écriture de `variantClasses` dans `Button.svelte` plus directe qu'un équivalent Vue nécessitant systématiquement `.value` pour lire ou comparer la valeur sous-jacente.

Sur `Contact.svelte`, la validation du formulaire s'appuie entièrement sur ce système de valeurs dérivées en cascade :

```svelte
let isNameValid = $derived(formData.fullName.length >= 2) let isEmailValid =
$derived(formData.email.includes("@") && formData.email.includes(".")) let
isFormValid = $derived(isNameValid && isEmailValid && isMessageValid)
```

Ce que cette migration a appris sur la réactivité en général, c'est qu'il existe un arbitrage constant entre l'explicite et l'implicite. React force à tout rendre explicite (setter dédié, tableau de dépendances de `useEffect`), ce qui rend le comportement très prévisible mais verbeux. Svelte automatise la détection des dépendances réactives directement au moment de la compilation, ce qui réduit fortement le code à écrire, mais demande de bien comprendre ce que le compilateur considère comme réactif ou non, comme l'a illustré concrètement l'avertissement `state_referenced_locally` rencontré avant l'ajout de `$derived` sur `Button.svelte`.

## Logique de rendu

Le rendu conditionnel et le rendu de liste sont les deux points où Svelte s'éloigne le plus nettement de la syntaxe JSX de React, tout en se rapprochant par endroits de la logique de blocs de Vue.

En React, le rendu conditionnel détourne des opérateurs JavaScript standards, le plus courant étant l'opérateur logique `&&` :

```jsx
// React : Insights.jsx
{
  error && <p className="text-red-400">{error}</p>;
}
```

Vue utilise la directive `v-if` directement sur la balise concernée. Svelte introduit un vrai bloc de contrôle dédié :

```svelte
<!-- Svelte : Insights.svelte -->
{#if error}
  <p class="text-red-400">{error}</p>
{/if}
```

Cette syntaxe m'a semblé plus lisible et plus proche d'un vrai langage de template que d'une astuce de langage détournée, notamment parce qu'elle élimine le risque classique du `&&` en JSX, où une condition qui vaudrait `0` plutôt que `false` s'afficherait littéralement à l'écran.

Pour le rendu de liste, React utilise `.map()` en JavaScript pur, avec une prop `key` posée sur l'élément racine retourné. Svelte propose un bloc dédié `{#each}` :

```jsx
// React : Hero.jsx
{
  stats.map((stat) => {
    return <StatCard key={stat.label} value={stat.value} label={stat.label} />;
  });
}
```

```svelte
<!-- Svelte : Hero.svelte -->
{#each stats as stat (stat.label)}
  <StatCard value={stat.value} label={stat.label} />
{/each}
```

La syntaxe Svelte reste plus proche de Vue sur ce point (une directive de bloc plutôt qu'une méthode de tableau JavaScript), mais elle ajoute la clé directement entre parenthèses après la variable d'itération, ce qui la rapproche formellement du `key={...}` de React tout en conservant la structure de bloc de Vue. Ce même bloc `{#each}` a aussi été utilisé avec un second paramètre pour récupérer l'index, dans `Features.svelte` et `Insights.svelte` (`{#each features as feature, index (index)}`), reproduisant fidèlement le second paramètre `(feature, index)` du `.map()` React original.

## Cycle de vie et effets de bord

Pour la récupération asynchrone des insights dans `Insights.svelte`, la rune `$effect()` a été utilisée comme équivalent direct de `useEffect(() => {...}, [])` en React :

```jsx
// React
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

```svelte
<!-- Svelte -->
$effect(() => {
  async function fetchInsights() {
    try {
      const data = await getInsights()
      insights = data
    } catch {
      error = "Failed to load insights."
    }
  }
  fetchInsights()
})
```

Svelte propose aussi une fonction `onMount()`, plus proche conceptuellement du `onMounted()` de Vue, qui s'exécute une seule fois au montage du composant sans dépendre d'un système de traque de dépendances réactives. Le choix de `$effect()` plutôt que `onMount()` dans ce projet a été motivé par la proximité directe avec le comportement du `useEffect` original : comme le corps de l'effet ne lit aucune valeur réactive avant d'appeler `fetchInsights()`, `$effect()` ne se réexécute jamais après son premier passage, ce qui reproduit fidèlement le comportement du tableau de dépendances vide (`[]`) de React. `onMount()` aurait toutefois constitué un choix tout aussi valide, et probablement plus explicite dans l'intention, puisqu'il n'existe ici aucune vraie dépendance réactive à surveiller.

Ce qui reste similaire malgré la syntaxe différente entre les trois frameworks, c'est le besoin sous-jacent : exécuter du code, souvent asynchrone, une fois que le composant est prêt à être affiché, puis mettre à jour l'état local avec le résultat obtenu. Les trois frameworks répondent à ce même besoin avec des mécanismes distincts, mais un objectif strictement identique.

## Formulaires et événements

Le formulaire de contact a constitué la partie la plus dense de toute la migration, à la fois pour l'état, la validation et les événements. En React, un input contrôlé nécessite deux props distinctes : `value` pour afficher la donnée, et `onChange` pour la mettre à jour à chaque frappe :

```jsx
// React
<input
  value={formData.fullName}
  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
  onBlur={() => setTouched({ ...touched, fullName: true })}
/>
```

Vue simplifie cela avec `v-model`, qui combine affichage et mise à jour en une seule directive. Svelte propose un équivalent direct avec `bind:value`, qui remplace à lui seul le `value` et le `onChange` de la version React :

```svelte
<!-- Svelte -->
<input
  bind:value={formData.fullName}
  onblur={() => (touched.fullName = true)}
/>
```

Côté événements, Svelte 5 a changé de convention par rapport aux versions précédentes du framework : les événements se passent désormais comme des props classiques, en minuscule et sans les deux-points de l'ancienne syntaxe Svelte 4 (`onsubmit={handleSubmit}`, `onblur={...}`), ce qui rapproche visuellement Svelte 5 de React (`onSubmit`) davantage que de la syntaxe Vue (`@submit.prevent`). Une différence importante à noter concerne justement la gestion du comportement par défaut du navigateur : Vue propose des modificateurs d'événements intégrés comme `.prevent`, qui suppriment le besoin d'appeler `preventDefault()` manuellement. Svelte ne fournit pas de raccourci équivalent, et l'appel à `e.preventDefault()` doit rester manuel dans la fonction de traitement, exactement comme en React :

```svelte
<!-- Svelte -->
<form onsubmit={handleSubmit}>
```

```js
async function handleSubmit(e) {
  e.preventDefault();
  // ...
}
```

La validation du formulaire elle-même (longueur minimale du nom, présence d'un `@` et d'un `.` dans l'email, longueur minimale du message) a pu être portée presque sans aucune modification depuis React vers Svelte, car cette logique est du JavaScript pur, indépendant du framework. Seule la déclaration des variables qui en dépendent a changé, en passant de simples `const` React à des `$derived` Svelte, pour que le compilateur sache qu'elles doivent se recalculer à chaque changement de `formData`.

## Organisation du projet

La structure de dossiers du projet Svelte (`components/ui`, `components/cards`, `components/layout`, `components/sections`, `data`, `services`) reprend exactement l'organisation déjà mise en place pour les projets React et Vue. Cette continuité n'est pas un hasard : elle a permis de migrer composant par composant en gardant une correspondance directe entre chaque fichier des trois projets, ce qui a nettement simplifié le travail de comparaison, de vérification et d'écriture de ce document.

Ce qui a changé, du fait de conventions propres à l'écosystème Svelte, concerne surtout les extensions de fichiers (`.svelte` au lieu de `.jsx` ou `.vue`) et la nécessité d'installer des outils spécifiques non fournis par défaut, comme `eslint-plugin-svelte` pour le linting des fichiers `.svelte`, ou `prettier-plugin-svelte` pour que le formatage automatique à la sauvegarde fonctionne correctement dans l'éditeur, ce dernier ayant nécessité un rechargement de VS Code pour être pris en compte après installation.

Un point notable, propre à cette migration précise, a concerné les icônes de réseaux sociaux du `Footer`. Depuis la version 1.0 de Lucide, toutes les icônes de marques déposées (Instagram, TikTok, X, YouTube, GitHub, et autres) ont été supprimées du package pour des raisons légales liées aux droits d'usage des logos, contrairement à `react-bootstrap-icons` et `bootstrap-icons-vue`, qui continuent de les fournir. Il a donc fallu identifier et installer un second package dédié, `svelte-bootstrap-icons`, uniquement pour ces quatre icônes spécifiques, tout en conservant `@lucide/svelte` pour l'ensemble des autres icônes du projet, exactement comme cela avait déjà été le cas pour la version Vue avec `bootstrap-icons-vue` en complément de `lucide-vue-next`.

Un autre point de configuration propre à Svelte concerne l'accessibilité : le compilateur Svelte embarque nativement des vérifications d'accessibilité (comme `a11y_invalid_attribute`), inexistantes en React et en Vue. Ce contrôle a par exemple signalé un `href="#"` sur le logo dans `Header.svelte`, ce qui a conduit à le remplacer par une ancre valide (`href="#hero-section"`) plutôt que de conserver un lien sans destination réelle, une amélioration que ni React ni Vue n'auraient signalée automatiquement.

## Migration assistée par IA

Claude a été utilisé comme assistant tout au long de cette migration, avec la même méthode que pour le projet Vue : le code React d'origine était fourni composant par composant, et chaque conversion était accompagnée d'une explication avant validation, plutôt que livrée sans justification.

Le fait d'avoir déjà migré l'application vers Vue.js a directement facilité cette troisième migration : la structure des composants, les responsabilités de chaque fichier et la logique métier (validation du formulaire, récupération asynchrone des insights) étaient déjà stabilisées et bien comprises depuis le projet précédent. Le travail restant portait presque exclusivement sur la traduction syntaxique vers l'écosystème Svelte, plutôt que sur une nouvelle réflexion de conception, ce qui a permis d'avancer plus rapidement sur les composants les plus simples (`ui/`, `cards/`) que lors de la première migration vers Vue.

Ce qui a bien fonctionné avec l'assistance IA : la conversion des patterns récurrents (props, classes dynamiques, rendu de liste) a été rapide une fois le principe compris sur les premiers composants, comme `Brand.svelte` puis `Button.svelte`, et a pu être répétée de façon quasi automatique sur les composants suivants.

Ce qui a nécessité une relecture et une correction manuelle a été plus important que sur le projet Vue, précisément parce que Svelte 5 introduit des concepts nouveaux (runes, snippets) sans équivalent direct dans les deux frameworks précédents :

- Une erreur d'interprétation initiale sur les snippets a conduit à écrire systématiquement `{#snippet children()}...{/snippet}`, alors que Svelte transforme automatiquement le contenu placé entre les balises d'un composant en snippet `children` implicite. Cette erreur n'a été détectée que grâce à ESLint (règle `svelte/no-useless-children-snippet`), ce qui a montré l'importance de faire tourner les outils de vérification du projet à intervalles réguliers plutôt qu'en toute fin de migration.
- Une classe Tailwind invalide (`text-smm`) présente depuis le projet React d'origine a été repérée en migrant `About.jsx`, puis délibérément corrigée dans les trois versions du projet (React, Vue, Svelte) plutôt que reproduite silencieusement, après discussion sur l'impact réel de cette correction sur la cohérence visuelle entre les trois implémentations.
- Un style inline (`style={{...}}` en React, `:style="{...}"` en Vue) utilisé pour un dégradé radial en arrière-plan du `Hero` et du `Contact` a été identifié comme non conforme à l'exigence explicite de l'énoncé interdisant les styles inline. Il a été converti en classe Tailwind arbitraire (`bg-[radial-gradient(...)]`) pour la version Svelte, révélant au passage que cette même exigence n'avait pas été respectée à 100 % lors de la migration Vue précédente.
- Une balise `<a>` ouvrante a été omise à plusieurs reprises dans des blocs de code fournis par l'assistant pendant la migration, un problème déjà rencontré lors du projet Vue, ce qui a nécessité une vigilance particulière de relecture avant intégration du code proposé.

La qualité de la structure du projet React d'origine a eu un impact direct sur la fiabilité de cette migration assistée : la séparation nette entre `ui/`, `cards/`, `layout/`, `sections/`, `data/` et `services/` a permis de convertir chaque fichier isolément, sans avoir à démêler une logique éclatée entre plusieurs responsabilités, ce qui aurait considérablement complexifié le travail de vérification pour chaque composant.

## Perspective professionnelle

Ce projet, cumulé aux deux précédents, a montré qu'apprendre un nouveau framework consiste moins à mémoriser une nouvelle syntaxe qu'à identifier les concepts qui restent stables d'un framework à l'autre : la notion de composant comme unité isolée, le flux de données par props en lecture seule, la distinction entre état local et donnée dérivée, le rendu conditionnel, le rendu de liste, et un mécanisme d'exécution de code au montage. Une fois ces concepts solidement compris via React, chaque nouveau framework devient progressivement un exercice de traduction plutôt qu'un apprentissage complet depuis zéro, ce qui explique pourquoi la migration vers Svelte a été perçue comme plus rapide que celle vers Vue, malgré l'introduction de concepts syntaxiquement nouveaux comme les runes.

Comprendre l'architecture d'un composant compte davantage que mémoriser sa syntaxe exacte, car la syntaxe se retrouve facilement dans la documentation officielle, alors que la capacité à découper une interface en composants avec des responsabilités claires et une séparation nette entre données, logique et présentation est ce qui rend une migration ou une collaboration inter-frameworks réellement possible.

L'IA a clairement réduit la barrière entre les écosystèmes frontend au cours de ce projet, en accélérant la phase de traduction syntaxique une fois les intentions du code d'origine bien comprises, et en permettant d'explorer un troisième modèle de réactivité (la compilation statique de Svelte) sans avoir à apprendre seul, depuis la documentation brute, chaque nouvelle rune une par une.

Mais ce projet a aussi montré, à plusieurs reprises et de façon plus marquée que le précédent, pourquoi un développeur doit continuer à lire, tester, déboguer et valider le code généré, plutôt que de le copier tel quel : une erreur de conception sur les snippets Svelte n'a été détectée que parce que le linting du projet a été exécuté et son résultat interprété ; un style inline non conforme à l'énoncé n'a été identifié qu'après une relecture attentive des exigences ; et une classe Tailwind invalide héritée du tout premier projet React n'a été corrigée qu'après une remise en question explicite de la reproduction fidèle d'un bug plutôt que de sa correction. Sans cette vérification active à chaque étape, ces trois problèmes seraient passés inaperçus dans le rendu final.
