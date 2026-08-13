# Learning Objectives

## General

**What is Svelte ?**

Svelte est un framework JavaScript utilisé pour construire des interfaces utilisateur, mais qui se distingue des autres par sa nature de compilateur. Plutôt que d'exécuter un moteur de réactivité dans le navigateur pendant que l'application tourne, Svelte analyse le code source au moment du build et génère directement du JavaScript optimisé qui manipule le DOM réel. Il n'y a donc pas de Virtual DOM ni de runtime embarqué dans le bundle final, contrairement à React et Vue.

**What is a frontend framework ?**

Un framework front-end est un ensemble d'outils, de conventions et de bibliothèques qui structurent la façon de construire une interface web. Il fournit une manière standardisée de gérer les composants, l'état, le rendu et les interactions, plutôt que de tout écrire à la main avec du JavaScript brut.

**Why multiple frontend frameworks exist ?**

Plusieurs frameworks existent car ils répondent à des priorités différentes : certains privilégient la performance, d'autres la simplicité d'apprentissage, d'autres encore la flexibilité ou la taille du bundle final. React, Vue et Svelte proposent chacun un compromis différent entre puissance, syntaxe, modèle de réactivité et courbe d'apprentissage, ce qui permet à différents projets et différentes équipes de choisir l'outil le plus adapté à leur contexte.

**Why frontend frameworks share similar concepts ?**

Tous les frameworks front-end modernes doivent résoudre les mêmes problèmes fondamentaux : comment découper une interface en unités réutilisables, comment stocker et faire évoluer des données, comment mettre à jour l'affichage quand ces données changent, et comment réagir aux actions de l'utilisateur. C'est pour cette raison qu'on retrouve partout des notions équivalentes, comme les composants, les props, l'état local et le rendu conditionnel, même si leur nom, leur syntaxe ou leur mécanisme interne diffère d'un framework à l'autre.

**Why frontend frameworks use different syntaxes ?**

Chaque framework fait des choix de conception différents sur la façon d'exprimer ces concepts communs. React reste très proche de JavaScript pur et utilise JSX, qui mélange logique et HTML dans une seule fonction. Vue sépare explicitement logique et rendu dans des blocs distincts, avec des directives dédiées. Svelte pousse la simplicité syntaxique encore plus loin en supprimant la plupart des indirections : pas de fonction composant, pas de balise `<template>`, juste un bloc `<script>` suivi de HTML étendu par quelques blocs de contrôle (`{#if}`, `{#each}`) et des runes (`$state`, `$props`, `$derived`).

**How framework migration can be assisted by AI ?**

Un assistant IA peut accélérer la conversion mécanique d'un framework à l'autre en proposant l'équivalent syntaxique d'un concept connu, comme transformer un `useState` React en `$state()` Svelte, ou un `.map()` en `{#each}`. Il peut aussi expliquer, à la demande, pourquoi une syntaxe diffère d'une autre, ce qui aide à comprendre le nouveau framework plutôt que de se contenter d'une traduction automatique non comprise.

**Why code structure matters when migrating a project ?**

Un projet source bien structuré, avec une séparation claire entre composants réutilisables (`ui/`), composants de présentation (`cards/`), mise en page (`layout/`), sections de page (`sections/`), données (`data/`) et logique d'accès aux données (`services/`), permet de migrer fichier par fichier sans avoir à démêler une logique éclatée entre plusieurs responsabilités. Dans ce projet, la structure déjà établie côté React a directement facilité la migration vers Svelte, exactement comme elle avait facilité la migration vers Vue au préalable.

## Svelte

**What is a Svelte component ?**

Un composant Svelte est une unité réutilisable d'interface qui encapsule sa propre logique et son propre rendu dans un seul fichier `.svelte`. Contrairement à React ou Vue, il n'y a ni fonction wrapper ni export explicite : le fichier entier constitue directement le composant.

**What is a `.svelte` file ?**

Un fichier `.svelte` contient un bloc `<script>` optionnel pour la logique JavaScript, suivi directement du template HTML, sans aucune balise englobante. Tout ce qui est déclaré dans le `<script>` (variables, fonctions, imports) devient automatiquement accessible dans le template placé en dessous.

**What is reactive rendering in Svelte ?**

Le rendu réactif est le mécanisme par lequel l'affichage se met à jour automatiquement lorsqu'une valeur réactive change, sans qu'il soit nécessaire d'écrire manuellement du code de synchronisation avec le DOM. En Svelte, ce comportement est déterminé à la compilation : le compilateur identifie quelles parties du template dépendent de quelle variable réactive, et génère le code minimal nécessaire pour mettre à jour uniquement ces parties.

**What is a reactive variable ?**

Une variable réactive est une variable déclarée avec la rune `$state()`, ou une prop reçue via `$props()`, que Svelte surveille activement. Toute modification de cette variable déclenche automatiquement la mise à jour de l'interface qui en dépend.

**What is a prop in Svelte ?**

Une prop est une donnée transmise par un composant parent à un composant enfant, en lecture seule côté enfant. Dans ce projet, `FeatureCard.svelte` reçoit par exemple `icon`, `title` et `description` comme props, exactement comme son équivalent React recevait ces mêmes valeurs via les paramètres de sa fonction.

**What is `$props()` ?**

`$props()` est la rune Svelte 5 qui permet de récupérer l'ensemble des props transmises à un composant. Elle s'utilise généralement en déstructuration directe, avec des valeurs par défaut possibles, par exemple `let { variant = "primary", href, children } = $props()` dans `Button.svelte`.

**What is `$state()` ?**

`$state()` est la rune qui transforme une variable en valeur réactive. Contrairement à `useState` en React, elle ne retourne pas de paire valeur/setter : la variable se modifie directement par affectation. Lorsqu'elle enveloppe un objet, comme `formData` dans `Contact.svelte`, cet objet devient profondément réactif, ce qui permet de modifier directement une de ses propriétés sans recréer une copie complète.

**What is `bind:value` ?**

`bind:value` est une directive Svelte qui crée une liaison à double sens entre un champ de formulaire et une variable réactive. Elle combine automatiquement l'affichage de la valeur actuelle et sa mise à jour à chaque saisie, remplaçant le duo `value`/`onChange` nécessaire en React.

**What is `{#each}` ?**

`{#each}` est un bloc de contrôle Svelte qui permet de répéter un élément ou un composant pour chaque entrée d'un tableau, par exemple `{#each stats as stat (stat.label)}...{/each}` dans `Hero.svelte`. La valeur entre parenthèses après la variable d'itération sert de clé, jouant le même rôle que le `key` de React ou la `:key` de Vue.

**What is `{#if}` ?**

`{#if}` est un bloc de contrôle Svelte qui insère ou retire un élément du rendu selon qu'une condition est vraie ou fausse, avec la possibilité d'ajouter `{:else if}` et `{:else}`. Il remplace en Svelte l'opérateur `&&` détourné en React pour du rendu conditionnel, comme dans `Insights.svelte` où `{error && <p>...}` est devenu `{#if error}<p>...</p>{/if}`.

**What is `onMount` ?**

`onMount` est une fonction de cycle de vie Svelte qui exécute du code une seule fois, juste après que le composant a été inséré dans le DOM. Elle joue le même rôle que `onMounted` en Vue ou `useEffect(() => {}, [])` en React. Dans ce projet, `$effect()` a été utilisé à la place dans `Insights.svelte`, un choix équivalent puisque l'effet ne lit aucune dépendance réactive et ne se réexécute donc jamais après son premier passage.

**How Svelte reactivity works ?**

La réactivité de Svelte repose sur une analyse effectuée au moment de la compilation, et non sur un mécanisme exécuté en continu dans le navigateur. Le compilateur identifie chaque variable déclarée avec `$state()` ou `$derived()`, détermine quelles portions du template en dépendent, et génère un code JavaScript qui met à jour précisément ces portions lorsque la variable change. C'est une différence fondamentale avec React, où c'est tout le composant qui est réexécuté à chaque changement d'état, ou avec Vue, où un système de proxy traque les dépendances à l'exécution.

**How to create Svelte components ?**

Un composant Svelte se crée en écrivant un fichier `.svelte` contenant, si nécessaire, un bloc `<script>` pour la logique, suivi directement du HTML du template, sans balise englobante. Ce fichier peut ensuite être importé et utilisé comme une balise dans un autre composant.

**How to organize a Svelte project ?**

Un projet Svelte s'organise généralement par dossiers selon le rôle des fichiers : les composants réutilisables dans `components/`, les données statiques dans `data/`, la logique d'accès aux données dans `services/`, et le point d'entrée dans `main.js`. Dans ce projet, les composants sont eux-mêmes répartis en sous-dossiers `ui/`, `cards/`, `layout/` et `sections/`, une organisation directement reprise des projets React et Vue précédents.

**How to manage reactive state ?**

L'état réactif se gère avec `$state()` pour les valeurs simples ou les objets, et avec `$derived()` pour les valeurs qui doivent être recalculées automatiquement à partir d'autres valeurs réactives, comme `variantClasses` dans `Button.svelte` ou `isFormValid` dans `Contact.svelte`.

**How to bind data to the UI ?**

Une donnée se lie à l'interface en l'insérant directement dans le texte ou un attribut avec des accolades, par exemple `{title}` ou `class={variantClasses}`, sans préfixe particulier contrairement à Vue. Pour les champs de formulaire, `bind:value` assure une liaison à double sens.

**How to handle user interactions ?**

Les interactions utilisateur se gèrent avec des props d'événements écrites en minuscule, comme `onclick`, `onsubmit` ou `onblur`, qui reçoivent une fonction JavaScript. Contrairement à Vue, Svelte 5 ne propose pas de modificateur intégré comme `.prevent` : l'appel à `e.preventDefault()` doit rester manuel dans la fonction, comme dans `handleSubmit` de `Contact.svelte`.

**How to render dynamic content ?**

Le contenu dynamique se rend principalement avec `{#each}` pour les listes, `{#if}` pour l'affichage conditionnel, et l'utilisation directe d'une variable commençant par une majuscule comme balise pour afficher dynamiquement un composant dont seule la référence est connue à l'avance, comme les icônes stockées dans `features.js` et utilisées dans `FeatureCard.svelte`.

## React vs Vue.js vs Svelte

**Similarities between React, Vue.js and Svelte ?**

Les trois frameworks partagent la même philosophie de base : construire une interface à partir de composants réutilisables, transmettre des données de haut en bas avec des props en lecture seule, gérer un état local qui déclenche automatiquement une mise à jour de l'affichage, permettre le rendu conditionnel et dynamique de contenu, et exécuter du code au moment où un composant est monté.

**Differences between React, Vue.js and Svelte ?**

La différence la plus fondamentale se situe dans le mécanisme de réactivité : React réexécute la fonction composant entière à chaque changement d'état et compare le résultat via un Virtual DOM, Vue traque les dépendances à l'exécution grâce à des proxys, et Svelte détermine tout cela à la compilation, sans runtime de réactivité embarqué. Ces différences de mécanisme se répercutent directement sur la syntaxe de chaque framework et sur la quantité de code nécessaire pour exprimer une même intention, Svelte étant généralement le plus concis des trois.

**JSX versus Vue templates versus Svelte templates ?**

JSX est du JavaScript à part entière, compilé en appels de fonction, ce qui permet d'y utiliser n'importe quelle expression du langage. Le template Vue est un langage dédié, séparé dans un bloc `<template>`, qui n'autorise que des expressions à l'intérieur de ses directives. Le template Svelte se situe entre les deux : il ressemble à du HTML presque pur, sans balise englobante ni directives préfixées comme en Vue, mais avec des blocs de contrôle dédiés (`{#if}`, `{#each}`) plutôt que des expressions JavaScript détournées comme en JSX.

**Props in React versus props in Vue.js versus props in Svelte ?**

En React, les props sont reçues comme paramètre de la fonction composant, souvent déstructuré directement, sans validation de type native. En Vue, elles se déclarent explicitement avec `defineProps`. En Svelte, elles se récupèrent avec la rune `$props()`, déstructurée en une seule ligne avec des valeurs par défaut possibles, une syntaxe visuellement très proche de la déstructuration de paramètres en React.

**`useState` versus `ref` versus `$state()` ?**

`useState` retourne une paire composée de la valeur actuelle et d'une fonction dédiée pour la modifier, avec une logique d'immutabilité stricte imposant de recréer les objets modifiés. `ref()` retourne un objet réactif dont la valeur se lit et se modifie via `.value`. `$state()` transforme directement la variable en valeur réactive, sans setter ni indirection `.value`, et permet même de modifier directement une propriété d'un objet imbriqué, comme observé sur `touched.fullName = true` dans `Contact.svelte`, ce qui en fait le plus direct des trois mécanismes.

**`useEffect` versus `onMounted` versus `onMount` ?**

`useEffect` est un hook générique dont le comportement dépend d'un tableau de dépendances explicite, un tableau vide signifiant qu'il ne s'exécute qu'une fois. `onMounted` et `onMount` expriment directement cette intention par leur nom, sans tableau de dépendances à gérer manuellement. Svelte propose aussi `$effect()`, plus proche de `useEffect` dans son principe de traquer automatiquement les dépendances lues à l'intérieur, utilisé dans `Insights.svelte` pour reproduire fidèlement le comportement d'un `useEffect` à dépendances vides.

**Conditional rendering in React versus Vue.js versus Svelte ?**

React utilise des expressions JavaScript natives comme l'opérateur `&&` ou le ternaire, directement dans le JSX. Vue utilise la directive `v-if`, posée directement sur la balise concernée. Svelte utilise un bloc de contrôle dédié, `{#if}...{/if}`, plus proche de la lisibilité de Vue que de l'astuce syntaxique de React, tout en évitant les pièges classiques du `&&`, comme l'affichage involontaire du chiffre `0`.

**Dynamic rendering in React versus Vue.js versus Svelte ?**

React génère des listes avec la méthode native `.map()`, qui retourne un tableau d'éléments JSX. Vue utilise la directive `v-for`, intégrée directement à la syntaxe du template. Svelte utilise le bloc `{#each tableau as item, index (clé)}...{/each}`, conceptuellement proche de `v-for` dans sa forme de bloc de contrôle dédié, mais avec la clé placée entre parenthèses après la variable d'itération plutôt que dans un attribut séparé.

**Event handling in React versus Vue.js versus Svelte ?**

React attache les événements avec des props en camelCase préfixées par `on`, comme `onClick` ou `onSubmit`. Vue utilise la syntaxe `@evenement`, avec des modificateurs intégrés comme `.prevent`. Svelte 5 utilise des props d'événements en minuscule sans les deux-points de l'ancienne syntaxe Svelte 4, comme `onclick` ou `onsubmit`, ce qui le rapproche visuellement de React, mais sans modificateur équivalent à `.prevent` : `e.preventDefault()` doit rester manuel.

**Form management in React versus Vue.js versus Svelte ?**

React gère les formulaires avec des champs contrôlés, en liant manuellement `value` et `onChange` à l'état. Vue simplifie cette liaison avec `v-model`. Svelte propose `bind:value`, un équivalent direct de `v-model` qui combine lecture et écriture en une seule directive, remplaçant le duo `value`/`onChange` nécessaire en React, comme observé sur les trois champs de `Contact.svelte`.

**Project organization in React versus Vue.js versus Svelte ?**

Les trois projets de ce curriculum partagent la même organisation logique par dossiers (`components/ui`, `components/cards`, `components/layout`, `components/sections`, `data`, `services`). La différence se limite essentiellement à l'extension des fichiers de composants (`.jsx`, `.vue`, `.svelte`) et à des contraintes ou outils propres à chaque écosystème, comme la règle de nommage multi-mots imposée par ESLint côté Vue, ou l'installation de `eslint-plugin-svelte` et `prettier-plugin-svelte` côté Svelte pour que le linting et le formatage fonctionnent correctement.

## AI-assisted Development

**How AI can assist framework migration ?**

Un assistant IA peut accélérer la conversion mécanique d'un framework à l'autre en proposant l'équivalent syntaxique d'un concept connu, comme transformer un `useState` en `$state()` ou un `.map()` en `{#each}`. Il peut aussi expliquer, à la demande, pourquoi une syntaxe diffère d'une autre, ce qui aide à comprendre le nouveau framework plutôt que de se contenter d'une traduction automatique non comprise.

**How to write useful prompts for code migration ?**

Un prompt utile pour une migration fournit le code source complet du composant à convertir, précise le framework et la version cible, et rappelle les contraintes explicites du projet, comme l'interdiction des styles inline ou l'obligation d'utiliser une bibliothèque d'icônes précise. Demander une explication du code produit, plutôt qu'un simple bloc de code, permet aussi de vérifier la compréhension au fur et à mesure plutôt qu'en fin de migration.

**How to review AI-generated code ?**

Relire du code généré par IA consiste à vérifier que chaque ligne correspond à un comportement compris, et non simplement accepté parce qu'il compile ou s'affiche correctement. Dans ce projet, cette relecture a par exemple permis de repérer une balise `<a>` manquante à plusieurs reprises, ou d'identifier un usage inutile et incorrect de `{#snippet children()}` là où Svelte génère ce snippet implicitement.

**How to validate AI-generated code ?**

Valider du code généré passe par plusieurs vérifications concrètes : le lancer réellement en local, comparer visuellement le résultat avec la version React et Vue d'origine, exécuter les outils de qualité du projet comme ESLint, et confirmer que le build de production se termine sans erreur. Dans ce projet, chaque composant migré a été testé individuellement avant d'assembler l'application complète dans `App.svelte`.

**How to compare generated code with the original implementation ?**

Comparer le code généré à l'implémentation d'origine consiste à vérifier que chaque fonctionnalité (validation de formulaire, rendu conditionnel, rendu de liste, récupération de données) produit un résultat visuel et comportemental identique, et pas seulement une traduction syntaxique superficielle. Dans ce projet, cette comparaison a permis de repérer une classe Tailwind invalide (`text-smm`) déjà présente dans le projet React d'origine, restée invisible jusqu'à une relecture attentive du rendu.

**How to debug AI-generated code ?**

Déboguer du code généré par IA consiste à lire attentivement les messages d'erreur ou d'avertissement produits par le compilateur ou le linter, comme `state_referenced_locally` ou `svelte/no-useless-children-snippet` rencontrés dans ce projet, à les rechercher activement, puis à isoler le composant fautif plutôt que de tout réécrire.

**Why understanding generated code remains essential ?**

Comprendre le code généré reste essentiel car un assistant IA peut proposer une solution syntaxiquement correcte mais non conforme aux contraintes du projet, ou tout simplement erronée, comme l'a montré l'usage systématique et incorrect de `{#snippet children()}` au début de cette migration. Sans compréhension du code, il devient impossible de détecter ce type d'écart, de corriger une exigence non respectée comme un style inline oublié, ou d'expliquer et défendre les choix techniques du projet.

**Why AI-assisted development can reduce the barrier between different frontend ecosystems ?**

L'IA réduit la barrière entre écosystèmes en permettant de transposer une compréhension déjà acquise sur un framework vers un autre, sans avoir à réapprendre chaque concept depuis la documentation brute. Dans ce projet, la compréhension acquise sur React puis Vue a permis d'aborder Svelte comme un exercice de traduction plutôt qu'un apprentissage complet, l'assistant IA accélérant la phase mécanique de conversion tout en laissant le développeur se concentrer sur la validation, la logique métier et les cas particuliers propres à chaque projet.
