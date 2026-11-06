# Tâche 0 — La Confrontation des Modèles (Analyse de la dette sémantique)

## 1. Demande technique volontairement floue

> Écris un script pour scraper une page web et sauvegarder les données, en gérant les erreurs

Le même prompt, mot pour mot, a été envoyé aux deux modèles, dans une conversation neuve et sans contexte. Il ne précise ni la page à scraper, ni les données voulues, ni le langage, ni le format de sauvegarde, ni ce que « gérer les erreurs » signifie.

## 2. Modèles testés

| Profil | Outil | Modèle | Réglage |
|---|---|---|---|
| Généraliste | ChatGPT | GPT-6 | Medium |
| Spécialisé code | Claude Code | Claude Sonnet 5.5 | Effort High |

Claude Code est un outil orienté code qui repose sur un modèle généraliste : la différence de profil vient en partie de l'outil, pas seulement du modèle.

## 3. Résumé des différences observées

Les deux modèles ont produit un script Python avec `requests` et `BeautifulSoup`, avec des tentatives automatiques (retries), un timeout et des journaux. Ils diffèrent surtout sur la façon de combler le flou :

| Point | GPT-6 | Claude Code (Sonnet 5.5) |
|---|---|---|
| Cible du scraping | URL écrite en dur (`quotes.toscrape.com`) | URL passée en argument de ligne de commande |
| Données extraites | Citations et auteurs (sélecteurs liés à ce site) | Liens de la page par défaut, ou sélecteur CSS au choix |
| Format de sortie | CSV uniquement (`donnees.csv`) | JSON ou CSV selon l'extension, `output.json` par défaut |
| Écriture du fichier | Directe, en écrasant le fichier existant | Fichier temporaire puis renommage, en écrasant aussi le fichier existant |
| Structure du code | Script simple en fonctions | Interface en ligne de commande (`argparse`), exception personnalisée, codes de retour |

GPT-6 a donné un script qui fonctionne immédiatement, mais seulement sur un site d'exemple. Claude Code a donné un outil plus générique, mais avec beaucoup de code non demandé.

## 4. Problèmes et choix arbitraires identifiés

1. **La cible a été inventée ou devinée.** Mon prompt ne donnait aucune page. GPT-6 a choisi `quotes.toscrape.com`, un site d'entraînement, et a construit tout le script autour (sélecteurs, noms de colonnes). Claude Code a rendu la cible configurable, mais a décidé que « les données » étaient « tous les liens de la page ».
2. **Le format et l'écrasement du fichier de sortie n'étaient pas demandés.** GPT-6 a choisi le CSV avec un encodage pensé pour Excel (`utf-8-sig`). Claude Code a choisi JSON ou CSV avec un encodage `utf-8` simple. Les deux écrasent silencieusement un fichier existant à chaque exécution.
3. **Aucune politesse envers le site cible dans le code.** Ni l'un ni l'autre ne vérifie `robots.txt` ni ne limite le rythme des requêtes dans le code. GPT-6 le mentionne seulement dans son texte d'accompagnement.
4. **Complexité non demandée.** Claude Code a ajouté une validation d'URL, plusieurs options et des codes de retour. GPT-6 importe le module `time` sans l'utiliser.

## 5. Auto-évaluation

Dans les deux réponses, le modèle a comblé les trous de mon prompt avec des choix qui lui semblaient les plus probables, sans me poser de question. J'ai identifié au moins deux hypothèses arbitraires : une cible de scraping inventée (GPT-6) ou une définition de « données » devinée (Claude Code), et un écrasement silencieux du fichier de sortie dans les deux cas. J'ai aussi relevé une hypothèse sur l'outil d'ouverture du fichier (Excel, pour l'encodage de GPT-6) et une gestion de la sécurité et de la politesse envers le site absente du code. Un prompt flou est dangereux en production parce que ces choix ne sont pas des erreurs visibles : le code est propre, il tourne, et rien ne signale qu'une décision d'architecture a été prise à ma place. L'erreur est découverte tard : données écrasées, script inutilisable sur la vraie cible, risque juridique ou technique côté site scrapé. Chaque correction demande ensuite de nouveaux échanges avec le modèle, donc des tokens et un coût supplémentaires. C'est de la dette sémantique, qui devient une dette technique puis financière.
