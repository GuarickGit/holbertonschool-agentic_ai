# FINOPS — Coût d'un agent de documentation de code

## 1. Mesure du System Prompt

- **Outil** : OpenAI Tokenizer (`platform.openai.com/tokenizer`)
- **Tokenizer sélectionné** : GPT-5.x & O1/3
- **Texte mesuré** : le System Prompt de l'énoncé, sans les guillemets, avec ses retours à la ligne (dernière ligne : `Code à analyser :`)
- **Résultat** : **75 tokens** pour 332 caractères (environ 4,4 caractères par token)

Un même texte peut donner un nombre de tokens différent selon le tokenizer : cette mesure vaut pour celui indiqué ci-dessus.

## 2. Données de l'exercice

| Donnée                  | Valeur           | Source                      |
| ----------------------- | ---------------- | --------------------------- |
| Prompt système          | 75 tokens        | Mesure ci-dessus            |
| Fichier de code injecté | 15 000 tokens    | Énoncé                      |
| Réponse générée         | 500 tokens       | Énoncé                      |
| Tarif input             | 5 $ / 1M tokens  | Énoncé (tarif de référence) |
| Tarif output            | 15 $ / 1M tokens | Énoncé (tarif de référence) |

Ces tarifs sont des tarifs de référence pour l'exercice, pas ceux d'un fournisseur réel.

Formule utilisée : `coût = (nombre de tokens ÷ 1 000 000) × tarif par million`.

## 3. Coût d'une seule exécution

- **Input** : 75 + 15 000 = 15 075 tokens, soit 15 075 ÷ 1 000 000 × 5 = **0,075375 $**
- **Output** : 500 tokens, soit 500 ÷ 1 000 000 × 15 = **0,0075 $**
- **Total : 0,082875 $** (environ 8,3 centimes de dollar)

Les tokens de sortie coûtent 3 fois plus cher que ceux d'entrée, mais l'input représente environ 91 % du coût (0,075375 ÷ 0,082875), parce que le volume envoyé est très supérieur au volume reçu.

## 4. Boucle d'erreur de 10 itérations

**Hypothèses**

- L'historique complet est conservé et renvoyé à chaque appel (énoncé).
- Chaque réponse de 500 tokens s'ajoute au contexte de l'appel suivant (énoncé).
- Les messages d'erreur renvoyés entre deux itérations ne sont pas comptés, car l'énoncé ne donne pas leur taille. Seules les réponses de 500 tokens s'ajoutent.

**Formule** : input de l'itération n = 15 075 + 500 × (n − 1) ; output = 500 tokens (0,0075 $) à chaque itération.

| Itération | Tokens input | Coût input | Coût output | Coût de l'itération | Coût cumulé    |
| --------- | ------------ | ---------- | ----------- | ------------------- | -------------- |
| 1         | 15 075       | 0,075375 $ | 0,0075 $    | 0,082875 $          | 0,082875 $     |
| 2         | 15 575       | 0,077875 $ | 0,0075 $    | 0,085375 $          | 0,168250 $     |
| 3         | 16 075       | 0,080375 $ | 0,0075 $    | 0,087875 $          | 0,256125 $     |
| 4         | 16 575       | 0,082875 $ | 0,0075 $    | 0,090375 $          | 0,346500 $     |
| 5         | 17 075       | 0,085375 $ | 0,0075 $    | 0,092875 $          | 0,439375 $     |
| 6         | 17 575       | 0,087875 $ | 0,0075 $    | 0,095375 $          | 0,534750 $     |
| 7         | 18 075       | 0,090375 $ | 0,0075 $    | 0,097875 $          | 0,632625 $     |
| 8         | 18 575       | 0,092875 $ | 0,0075 $    | 0,100375 $          | 0,733000 $     |
| 9         | 19 075       | 0,095375 $ | 0,0075 $    | 0,102875 $          | 0,835875 $     |
| 10        | 19 575       | 0,097875 $ | 0,0075 $    | 0,105375 $          | **0,941250 $** |

**Coût cumulé des 10 itérations : 0,94125 $.**

Le coût d'une itération augmente de 0,0025 $ à chaque tour (500 tokens × 5 $ ÷ 1 000 000). Sans accumulation, 10 itérations coûteraient 10 × 0,082875 = 0,82875 $ : l'accumulation ajoute 0,1125 $, soit environ 13,6 %.

## 5. Auto-évaluation

### Vérification du calcul

Je recalcule le total sans passer par le tableau :

- Tokens input cumulés : 10 × 15 075 + 500 × (0 + 1 + … + 9) = 150 750 + 22 500 = **173 250**, soit 173 250 × 5 ÷ 1 000 000 = 0,86625 $
- Tokens output cumulés : 10 × 500 = 5 000, soit 5 000 × 15 ÷ 1 000 000 = 0,075 $
- Total : 0,86625 + 0,075 = **0,94125 $**

Le résultat est identique à celui du tableau, et il tient bien compte de la croissance du contexte (le terme 500 × 45 = 22 500 tokens).

### Optimisation : la troncature du contexte

Au lieu de renvoyer tout l'historique, on ne garde que le prompt, le code et la dernière réponse :

- Itération 1 : 15 075 tokens en input.
- Itérations 2 à 10 : 15 075 + 500 = 15 575 tokens.
- Input cumulé : 15 075 + 9 × 15 575 = 155 250 tokens, soit 0,77625 $.
- Total avec l'output : 0,77625 + 0,075 = **0,85125 $**, contre 0,94125 $. L'économie est de 0,09 $, soit environ 9,6 %.

**Limites de cette solution :**

- Le gain est modeste, parce que l'historique accumulé ne pèse que 22 500 tokens sur 173 250. Le gros du coût (150 750 tokens, soit 87 % de l'input) est le même prompt et le même fichier renvoyés à chaque itération.
- La troncature fait perdre la mémoire de ce qui a déjà été essayé : le modèle risque de refaire la même erreur et de prolonger la boucle, ce qui peut coûter plus cher au final.

**Autres pistes possibles** (à vérifier selon le fournisseur, elles ne viennent pas de l'énoncé) : résumer l'historique plutôt que le supprimer, ou mettre en cache la partie fixe du prompt si le fournisseur le propose.
