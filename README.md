# Learning Objectives

## General

**What is Vite ?**

Vite est un outil de build (build tool) pour le développement web front-end. Il sert à démarrer rapidement un projet, lancer un serveur de développement ultra-rapide (grâce au Hot Module Replacement) et à générer une version optimisée du projet (le "build de production") prête à être déployée.

**What is React ?**

React est une bibliothèque JavaScript qui sert à construire des interfaces utilisateur en les découpant en composants réutilisables. Elle gère le rendu de l'interface et sa mise à jour automatique quand les données changent.

**What is a frontend build tool ?**

Un build tool est un programme qui transforme le code source (JSX, Tailwind, imports multiples, etc.) en fichiers HTML/CSS/JS optimisés, compréhensibles par n'importe quel navigateur. Il s'occupe aussi de la compilation, de la minification et du bundling (regroupement des fichiers).

**What is a frontend component ?**

Un composant est un bloc d'interface autonome et réutilisable (un bouton, une carte, un header...) qui regroupe sa structure (JSX), parfois son style, et son comportement.

**What is component-based architecture ?**

C'est une façon d'organiser une application en assemblant des composants indépendants les uns dans les autres, plutôt que d'écrire une seule grosse page monolithique. Chaque composant a une responsabilité précise.

**Why reusable components matter ?**

Parce qu'ils évitent de dupliquer le code : on écrit un composant une fois (ex : `FeatureCard`) et on le réutilise avec des données différentes via les props. Ça facilite la maintenance : une correction ou un changement de style se fait à un seul endroit.

**Why frontend architecture matters ?**

Une bonne architecture (dossiers organisés, composants bien séparés) rend le projet plus facile à comprendre, à faire évoluer et à déboguer, surtout quand il grossit ou qu'on travaille à plusieurs.

**What is a production build ?**

C'est la version finale et optimisée du site, générée par Vite (`npm run build`), avec le code minifié, les fichiers regroupés et optimisés pour la performance. C'est cette version qui est déployée en ligne, pas le code source brut.

**What is GitHub Pages ?**

Un service gratuit de GitHub qui permet d'héberger un site statique directement depuis un repository, à une URL du type `username.github.io/repo-name`.

---

## React

**What is JSX ?**

Une syntaxe qui permet d'écrire du HTML directement dans du JavaScript. Ce n'est pas du HTML réel : c'est transformé en appels JavaScript par un compilateur (Babel/Vite) avant d'être exécuté par le navigateur.

**What is a prop in React ?**

Une prop (property) est une donnée transmise d'un composant parent vers un composant enfant, un peu comme un paramètre de fonction. Les props sont en lecture seule dans l'enfant.

**What is state in React ?**

Le state est une donnée interne à un composant qui peut changer dans le temps, et dont la modification déclenche un nouveau rendu du composant. Géré avec `useState`.

**What is reactive rendering ?**

C'est le mécanisme par lequel React met automatiquement à jour l'affichage dès qu'une donnée (state ou props) change, sans qu'on ait à manipuler le DOM manuellement.

**What is conditional rendering ?**

Le fait d'afficher un élément (ou un autre, ou rien) selon une condition, par exemple avec un opérateur ternaire ou un `&&` dans le JSX (ex : afficher un message d'erreur seulement si un champ de formulaire est invalide).

**What is dynamic rendering ?**

Le fait de générer de l'affichage à partir de données qui varient (souvent un tableau), typiquement avec `.map()` pour transformer un tableau de données en une liste de composants JSX.

**How to organize a React project ?**

En séparant les responsabilités dans des dossiers dédiés : composants réutilisables (`components/`), sections de page (`sections/`), données statiques (`data/`), logique métier/services (`services/`). C'est l'organisation qu'on a mise en place dans le projet (task 8).

**How to create React components ?**

En écrivant une fonction JavaScript (PascalCase) qui retourne du JSX, placée dans son propre fichier, et exportée avec `export default`.

**How to structure reusable UI elements ?**

En identifiant les parties d'interface qui se répètent (bouton, badge, titre de section...) et en les extrayant dans des composants génériques qui reçoivent leur contenu via des props, plutôt que de dupliquer le JSX à chaque endroit (ex : `Brand`, `Button`, `SectionTitle` dans le projet).

**How to pass data with props ?**

En les passant comme des attributs JSX lors de l'appel du composant (`<FeatureCard title="..." description="..." />`), puis en les récupérant dans le composant enfant via son paramètre (`function FeatureCard({ title, description })`).

**How to manage state ?**

Avec le hook `useState`, qui retourne la valeur actuelle et une fonction pour la modifier. On ne modifie jamais l'état directement, toujours via cette fonction, ce qui déclenche un nouveau rendu.

**How to render dynamic content ?**

En combinant `useState` (pour stocker les données), éventuellement `useEffect` (pour les charger), et `.map()` dans le JSX pour transformer les données en éléments affichés.

**How to handle user interactions ?**

Avec des gestionnaires d'événements React (`onClick`, `onChange`, `onSubmit`...) qui appellent des fonctions, souvent pour mettre à jour un state (ex : le formulaire de contact avec les inputs contrôlés).

---

## UI and Accessibility

**What is semantic HTML ?**

L'utilisation de balises HTML qui décrivent le sens du contenu plutôt que juste son apparence : `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` au lieu de tout mettre dans des `<div>`. Ça aide les navigateurs, les moteurs de recherche et les lecteurs d'écran à comprendre la structure de la page.

**What is responsive design ?**

Une approche de conception qui fait en sorte que le site s'adapte correctement à toutes les tailles d'écran (mobile, tablette, desktop), notamment via les breakpoints Tailwind (`md:`, `lg:`) en mobile-first.

**What is accessibility ?**

L'ensemble des pratiques qui rendent un site utilisable par le plus grand nombre, y compris les personnes en situation de handicap (utilisation d'un lecteur d'écran, navigation au clavier, contraste des couleurs, tailles de police lisibles, etc.). Mesurée en partie par le score Accessibility de Lighthouse (96 sur le projet).

---

## Tailwind CSS

**How utility-first CSS works ?**

Au lieu d'écrire des règles CSS personnalisées dans un fichier séparé, on compose le style directement dans le HTML/JSX avec des classes utilitaires prédéfinies, chacune correspondant à une seule propriété CSS (`p-4`, `flex`, `text-white`...).

**How to style components with Tailwind CSS ?**

En combinant plusieurs classes utilitaires sur un même élément pour construire progressivement son apparence complète (couleurs, espacements, typographie, bordures...), en respectant le style guide fourni pour le projet.

**How to structure layouts with Flexbox and Grid ?**

Flexbox (`flex`, `flex-col`/`flex-row`, `items-*`, `justify-*`, `gap-*`) pour aligner des éléments sur un axe. Grid (`grid`, `grid-cols-*`) pour organiser des éléments en lignes et colonnes, utile pour des grilles de cartes (features, insights).

**How responsive utility classes work ?**

Les classes sans préfixe s'appliquent en mobile-first (petit écran par défaut), et les préfixes `md:`, `lg:` surchargent le style à partir de la largeur d'écran correspondante (ex : `flex-col md:flex-row`).

---

## API Consumption

**How asynchronous requests work ?**

Une requête asynchrone permet d'exécuter une tâche (comme récupérer des données) sans bloquer le reste du programme : le code continue de s'exécuter pendant que la requête est en cours, et on récupère le résultat plus tard (via `async`/`await` ou `.then()`).

**How to fetch external data ?**

En utilisant une fonction asynchrone (souvent avec `fetch` ou une fonction de service) déclenchée dans un `useEffect`, qui récupère les données puis les stocke dans un state avec `useState`.

**How to display dynamic content from an external file simulating an API ?**

En important ou en appelant une fonction qui simule un appel réseau (délai artificiel + retour de données), en stockant le résultat dans le state du composant, puis en l'affichant avec `.map()` — c'est le pattern utilisé pour la section Insights du projet.

**How to manage loading states ?**

En ajoutant un state dédié (ex : `isLoading`) mis à `true` avant l'appel et `false` une fois les données reçues, pour afficher un indicateur de chargement (spinner, texte "Chargement...") pendant l'attente et éviter d'afficher une interface vide ou cassée.
