import { t } from "$lib/translations"
export {t}
export const enum Step {
  INTRODUCTION = "Introduction",
  WAITING_ROOM = "Ouverture",
  ABRI_ENTRANCE = "Troubles visuels | Daltonisme",
  ABRI_MEDICAL = "Troubles cognitifs | Dyslexie",
  ABRI_COMPUTER = "Troubles visuels | Aveugle",
  ABRI_SEARCHCENTER = "Troubles cognitifs | Images intrusives",
  SURFACE_ENTRANCE = "Troubles moteurs | Tremblement souris",
  SURFACE_LABORATORY = "Troubles moteurs | Tremblement clavier",
  SURFACE_LABORATORY_AUDIOVISUALROOM = "Troubles auditifs | Surdité",
  SURFACE_LABORATORY_SANCTUARY = "Troubles cognitifs | Police, Zoom, Alignement",
  FINAL = "Epilogue",
}

export const hintsByStep = [
  {
    step: Step.WAITING_ROOM,
    hints: {
      "1": "Parfois les développeurs ne pensent pas aux personnes utilisant les outils d'assistance comme les assistants vocaux",
      "2": "Lis bien le texte et ce sur quoi tu dois cliquer",
      "3": "Le mot ici est un lien clickable. Click dessus pour continuer. Le bouton Continuer est un 'honeypot'"
    }
  }, {
    step: Step.ABRI_MEDICAL,
    hints: {
      "1": "Concentre toi sur les 2 dernières phrases avec les lettres qui bougent",
      "2": "Le douzième mot en partant du début, sans compter la virgule. Remplacer d par b",
      "3": "Le mot est byslexie"
    }
  }, {
    step: Step.ABRI_ENTRANCE,
    hints: {
      "1": "La note sur la table peut t'aider à trouver la combinaison, si tu ne veux pas tester toutes les combinaisons. Utilise le contraste et la luminosité",
      "2": "Positionne le contraste à 74 et la luminosité à 100",
      "3": "Le bon ordre est le quatrième, le troisième, le premier et le deuxième"
    }
  }, {
    step: Step.ABRI_SEARCHCENTER,
    hints: {
      "1": "Enigme 1 : Chut !, Enigme 2 : Certains mots ont plusieurs sens, Enigme 3 : la différence peut être minime",
      "2": "Enigme 1 : Quand on parle on le brise, Enigme 2 : la lettre a un double sens, Enigme 3 : on attend une lettre",
      "3": "Enigme 1 : silence, Enigme 2 : enveloppe, Enigme 3 : è"
    }
  }, {
    step: Step.ABRI_COMPUTER,
    hints: {
      "1": "Regarde bien les motifs sur la table, ces symboles ne te dise rien? Augmente le volume des sons, tu pourras entendre des choses",
      "2": "Est-ce une forme de langage écrit pour les non voyants?",
      "3": "Lorsque tu entends la zone de saisie, tape l'information correspondante et appuie sur tabulation. Fait de même pour les autres et lorsque tu entendras Soumettre, appuie sur la touche entrée"
    }
  }, {
    step: Step.SURFACE_ENTRANCE,
    hints: {
      "1": "Lorsque tu bouges la souris, ça tremblera moins que si tu restes sur place",
      "2": "Les personnes avec un handicap sont plus performant dans ce monde",
      "3": "Click sur le titre 'Tableau de contrôle' et click 2 fois sur la touche 'tabulation' pour sélectionner la croix et click sur la touche 'entrée'"
    }
  }, {
    step: Step.SURFACE_LABORATORY,
    hints: {
      "1": "Zoome en bas à droite, tu verras quelque chose d'intéressant. La transposition est ailleurs sur la carte",
      "2": "La transcription en bas à gauche représente les touches de ton clavier",
      "3": "tape le mot de passe : tremors. Attention, il faut que tu appuies plusieurs fois sur la même touche jusqu'à ce que la bonne lettre s'affiche"
    }
  }, {
    step: Step.SURFACE_LABORATORY_AUDIOVISUALROOM,
    hints: {
      "1": "En écoutant une bande son entièrement, tu auras une autre avec une surdité moins élevée",
      "2": "Augmente au maximum le son de ton ordinateur ou ta tablette",
      "3": "le mot de passe: surdité"
    }
  }, {
    step: Step.SURFACE_LABORATORY_SANCTUARY,
    hints: {
      "1": "La page est très grande, n'hésite pas à dézoomer et à scroller pour trouver les libellés et les champs de saisies. Les réponses aux 2 champs sont dans le texte",
      "2": "Utiliser la touche 'Tabulation' peut s'avérer utile pour être assez proche des champs de saisies",
      "3": "prénom : Majin, nom : molah ou prénom : Diva et nom : tchoungui. Le bouton valider est à gauche de la page"
    }
  }]
