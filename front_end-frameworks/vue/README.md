# Learning Objectives

## General

**What is Vue.js ?**

Vue.js est un framework JavaScript utilisé pour construire des interfaces utilisateur. Il permet de découper une application en composants réutilisables, chacun gérant sa propre logique et son propre rendu, et met automatiquement à jour l'affichage quand les données changent.

**What is a frontend framework ?**

Un framework front-end est un ensemble d'outils, de conventions et de bibliothèques qui structurent la façon de construire une interface web. Il fournit une manière standardisée de gérer les composants, l'état, le rendu et les interactions, plutôt que de tout écrire à la main avec du JavaScript brut.

**Why multiple frontend frameworks exist ?**

Plusieurs frameworks existent car ils répondent à des priorités différentes : certains privilégient la performance, d'autres la simplicité d'apprentissage, d'autres encore la flexibilité ou l'intégration avec un écosystème particulier. React, Vue, Angular ou Svelte proposent chacun un compromis différent entre puissance, syntaxe et courbe d'apprentissage, ce qui permet à différents projets et différentes équipes de choisir l'outil le plus adapté à leur contexte.

**Why frontend frameworks share similar concepts ?**

Tous les frameworks front-end modernes doivent résoudre les mêmes problèmes fondamentaux : comment découper une interface en unités réutilisables, comment stocker et faire évoluer des données, comment mettre à jour l'affichage quand ces données changent, et comment réagir aux actions de l'utilisateur. C'est pour cette raison qu'on retrouve partout des notions équivalentes, comme les composants, les props, l'état local et le rendu conditionnel, même si leur nom ou leur syntaxe diffère d'un framework à l'autre.

**Why frontend frameworks use different syntaxes ?**

Chaque framework fait des choix de conception différents sur la façon d'exprimer ces concepts communs. React reste très proche de JavaScript pur et utilise JSX, une extension de syntaxe qui mélange logique et HTML dans une seule fonction. Vue préfère séparer explicitement la logique et le rendu dans des blocs distincts, avec un langage de template dédié et des directives comme `v-if` ou `v-for`. Ces différences syntaxiques reflètent des philosophies différentes, pas des objectifs différents.

## Vue.js

**What is a Vue component ?**

Un composant Vue est une unité réutilisable d'interface qui encapsule sa propre logique, son propre rendu et éventuellement son propre style. Il peut recevoir des données depuis l'extérieur via des props, et être assemblé avec d'autres composants pour construire une application complète.

**What is a Single File Component (SFC) ?**

Un Single File Component est un fichier `.vue` qui regroupe dans un seul fichier les trois aspects d'un composant : la logique dans un bloc `<script setup>`, le rendu HTML dans un bloc `<template>`, et éventuellement le style dans un bloc `<style>`. Cette organisation rend explicite la séparation entre ce qui relève du comportement et ce qui relève de l'affichage.

**What is the Composition API ?**

La Composition API est la façon moderne d'écrire la logique d'un composant Vue, à l'intérieur d'un bloc `<script setup>`. Elle permet de déclarer des variables réactives, des fonctions et des hooks de cycle de vie directement dans le script, sans passer par un objet de configuration comme le faisait l'ancienne Options API. Tout ce qui est déclaré dans ce bloc devient automatiquement accessible dans le template, sans export explicite.

**What is a ref ?**

Une `ref` est une fonction de Vue qui transforme une valeur JavaScript classique en une valeur réactive. Elle retourne un objet possédant une propriété `.value`, qui contient la valeur réelle. Modifier `.value` déclenche automatiquement une mise à jour de l'affichage partout où cette valeur est utilisée.

**What is reactive data ?**

Une donnée réactive est une donnée que Vue surveille en permanence. Dès que sa valeur change, Vue met automatiquement à jour toutes les parties de l'interface qui en dépendent, sans que le développeur ait besoin de déclencher ce rafraîchissement manuellement. `ref()` et `computed()` sont les deux outils principaux utilisés pour créer ce type de données dans ce projet.

**What is v-model ?**

`v-model` est une directive Vue qui crée une liaison à double sens entre un champ de formulaire et une donnée réactive. Elle combine automatiquement l'affichage de la valeur actuelle dans le champ et la mise à jour de cette valeur à chaque saisie, sans avoir à écrire séparément un attribut `value` et un gestionnaire d'événement.

**What is v-for ?**

`v-for` est une directive Vue qui permet de répéter un élément ou un composant pour chaque entrée d'un tableau. Elle s'utilise directement sur la balise à répéter, par exemple `v-for="stat in stats"`, et doit être associée à une `:key` unique pour aider Vue à identifier chaque élément lors des mises à jour.

**What is v-if ?**

`v-if` est une directive Vue qui insère ou retire un élément du DOM selon qu'une condition est vraie ou fausse. Elle peut être combinée à `v-else-if` et `v-else` pour gérer plusieurs cas, et remplace les expressions conditionnelles JavaScript utilisées directement dans un template.

**What is onMounted ?**

`onMounted` est une fonction de cycle de vie de Vue qui exécute du code une seule fois, juste après que le composant a été inséré dans le DOM. Elle est typiquement utilisée pour déclencher un appel réseau ou charger des données au démarrage d'un composant.

**How Vue.js reactivity works ?**

La réactivité de Vue repose sur des valeurs enveloppées par `ref()` ou `reactive()`, que Vue surveille en interne. Lorsqu'une de ces valeurs est modifiée, Vue sait précisément quelles parties du template dépendent d'elle et ne met à jour que ces parties, plutôt que de recalculer tout le composant. C'est une différence fondamentale avec React, où c'est tout le composant qui est réexécuté à chaque changement d'état.

**How to create Vue components ?**

Un composant Vue se crée en écrivant un fichier `.vue` contenant un bloc `<template>` pour le HTML et, si nécessaire, un bloc `<script setup>` pour la logique. Ce fichier peut ensuite être importé et utilisé comme une balise dans un autre composant, en respectant la convention de nommage multi-mots imposée par le plugin ESLint de Vue.

**How to organize a Vue project ?**

Un projet Vue s'organise généralement par dossiers selon le rôle des fichiers : les composants réutilisables dans `components/`, les données statiques dans `data/`, la logique d'accès aux données dans `services/`, et le point d'entrée dans `main.js`. Dans ce projet, les composants sont eux-mêmes répartis en sous-dossiers `ui/`, `cards/`, `layout/` et `sections/`, une organisation directement reprise du projet React d'origine.

**How to manage reactive state ?**

L'état réactif se gère avec `ref()` pour les valeurs simples ou les objets, et avec `computed()` pour les valeurs qui doivent être recalculées automatiquement à partir d'autres valeurs réactives. La lecture et l'écriture se font via `.value` dans le script, tandis que le template accède directement à la valeur sans ce suffixe.

**How to bind data to the UI ?**

Une donnée se lie à l'interface en l'insérant dans le texte avec `{{ }}`, ou en l'attachant à un attribut HTML avec le préfixe `:` (raccourci de `v-bind:`), par exemple `:href="href"` ou `:class="..."`. Cela permet d'afficher dynamiquement une valeur ou de faire varier un attribut selon l'état du composant.

**How to handle user interactions ?**

Les interactions utilisateur se gèrent avec la syntaxe `@evenement`, comme `@click`, `@blur` ou `@submit`, suivie d'une expression ou du nom d'une fonction à exécuter. Vue propose également des modificateurs intégrés, comme `.prevent`, qui applique automatiquement `preventDefault()` sans avoir à l'écrire manuellement dans le code.

**How to render dynamic content ?**

Le contenu dynamique se rend principalement avec `v-for` pour les listes, `v-if` pour l'affichage conditionnel, et `<component :is="...">` pour afficher dynamiquement un composant dont seule la référence est connue à l'avance, comme les icônes stockées dans les fichiers de données de ce projet.

## React vs Vue.js

**Similarities between React and Vue.js ?**

Les deux frameworks partagent la même philosophie de base : construire une interface à partir de composants réutilisables, transmettre des données de haut en bas avec des props, gérer un état local qui déclenche automatiquement une mise à jour de l'affichage, et permettre le rendu conditionnel et dynamique de contenu.

**Differences between React and Vue.js ?**

La principale différence est la manière d'exprimer ces concepts communs. React reste proche de JavaScript et mélange logique et rendu dans une seule fonction avec JSX. Vue sépare explicitement logique et rendu dans des blocs distincts, et introduit un ensemble de directives dédiées (`v-if`, `v-for`, `v-model`) qui n'ont pas d'équivalent direct en JavaScript classique.

**JSX versus Vue templates ?**

JSX est du JavaScript à part entière, compilé en appels de fonction, ce qui permet d'y utiliser n'importe quelle expression du langage. Le template Vue est un langage dédié, plus proche du HTML, compilé séparément, qui n'autorise que des expressions à l'intérieur de ses directives plutôt que des instructions JavaScript complètes.

**Props in React versus props in Vue ?**

En React, les props sont reçues comme paramètre de la fonction composant, souvent déstructuré directement, sans validation de type native. En Vue, les props se déclarent explicitement avec `defineProps`, en précisant leur type, si elles sont requises et leur valeur par défaut, ce qui ajoute une validation intégrée mais aussi plus de verbosité.

**useState versus ref ?**

`useState` retourne une paire composée de la valeur actuelle et d'une fonction dédiée pour la modifier. `ref()` retourne un seul objet réactif dont la valeur se lit et se modifie via `.value`. La différence reflète un modèle d'exécution différent : React réexécute tout le composant à chaque changement d'état, alors que Vue ne l'exécute qu'une fois et suit ensuite précisément les valeurs réactives.

**useEffect versus onMounted ?**

`useEffect` est un hook générique dont le comportement dépend du tableau de dépendances passé en second argument ; un tableau vide signifie qu'il ne s'exécute qu'une fois. `onMounted` exprime directement cette même intention par son nom, sans tableau de dépendances à gérer, ce qui réduit le risque d'erreur de configuration.

**Conditional rendering in React versus Vue ?**

React utilise des expressions JavaScript natives comme l'opérateur `&&` ou le ternaire, directement dans le JSX. Vue utilise des directives dédiées, `v-if`, `v-else-if` et `v-else`, posées directement sur la balise concernée, ce qui évite certains pièges de l'opérateur `&&`, comme l'affichage involontaire du chiffre `0`.

**Dynamic rendering in React versus Vue ?**

React génère des listes avec la méthode native `.map()`, qui retourne un tableau d'éléments JSX et doit être insérée dans une expression `{...}`. Vue utilise la directive `v-for`, intégrée directement à la syntaxe du template, sans avoir besoin d'écrire une fonction de callback séparée.

**Event handling in React versus Vue ?**

React attache les événements avec des props en camelCase préfixées par `on`, comme `onClick` ou `onSubmit`, qui reçoivent une fonction JavaScript. Vue utilise la syntaxe `@evenement`, comme `@click`, et permet d'écrire une expression courte directement dans l'attribut sans créer systématiquement une fonction séparée.

**Form management in React versus Vue ?**

React gère les formulaires avec des champs contrôlés, en liant manuellement `value` et `onChange` à l'état, et nécessite d'appeler `e.preventDefault()` explicitement à la soumission. Vue simplifie cette liaison avec `v-model`, qui combine lecture et écriture en une seule directive, et propose le modificateur `.prevent` pour éviter le rechargement de page sans code additionnel.

**Project organization in React versus Vue ?**

Les deux projets de ce curriculum partagent la même organisation logique par dossiers (`components/ui`, `components/cards`, `components/layout`, `components/sections`, `data`, `services`). La différence se limite essentiellement à l'extension des fichiers de composants (`.jsx` contre `.vue`) et à une contrainte de nommage supplémentaire côté Vue, qui impose des noms de composants composés d'au moins deux mots.

## AI-assisted Development

**How AI can assist framework migration ?**

Un assistant IA peut accélérer la conversion mécanique d'un framework à l'autre en proposant l'équivalent syntaxique d'un concept connu, comme transformer un `useState` en `ref` ou un `.map()` en `v-for`. Il peut aussi expliquer, à la demande, pourquoi une syntaxe diffère d'une autre, ce qui aide à comprendre le nouveau framework plutôt que de se contenter d'une traduction automatique.

**How to review AI-generated code ?**

Relire du code généré par IA consiste à vérifier que chaque ligne correspond bien à un comportement compris, et non simplement accepté parce qu'il compile ou s'affiche correctement. Dans ce projet, cette relecture a par exemple permis de repérer une balise `<a>` manquante lors d'une conversion, ou de remarquer qu'une bibliothèque d'icônes suggérée ne correspondait pas exactement à celle demandée par l'énoncé.

**How to validate AI-generated code ?**

Valider du code généré passe par plusieurs vérifications concrètes : le lancer réellement en local, comparer visuellement le résultat avec la version d'origine, exécuter les outils de qualité du projet comme ESLint, et confirmer que le build de production se termine sans erreur. Dans ce projet, chaque composant migré a été testé individuellement avant d'assembler l'application complète.

**Why understanding generated code remains essential ?**

Comprendre le code généré reste essentiel car un assistant IA peut proposer une solution syntaxiquement correcte mais non conforme aux contraintes du projet, comme l'a montré le choix initial de `@lucide/vue` alors que l'énoncé imposait explicitement `lucide-vue-next`. Sans compréhension du code, il devient impossible de détecter ce type d'écart, de corriger une erreur de configuration comme celle rencontrée lors du déploiement GitHub Pages, ou d'expliquer et défendre les choix techniques du projet.
