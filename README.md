
# Really inaccessible 
## Description
Welcome to Rea11y Inaccessible, a dystopian escape game on digital accessibility inspired by https://github.com/damiengomez/EscapeGameA11y where you will have to overcome
the challenges of accessibility. An escape game where you will immerse yourself into a society where the norm is very different from the one you know.

## Add a language
- Create a directory containing the translation files src > locales > `language to be added`.
- Add index of selected language `src/routes/[lang]/(escape)/+layout.svelte` in the row `let selectedLanguageIndex = $page.params.lang === 'fr' ? 0`
- add language in `src > locales > existing languages > common.json` in `layout.menu.language` node and add his translation in all `common.json` files
- Create a new background image of Louis Braille with the birth and death hints:
    - using static > abri > computer > source > `louisBraille.pdn` with the paint.net software
    - or by modifying the files `static > abri > computer > source > base.png` and `static > abri > computer > source > document.png` with the software of your choice, then creating a `jpeg file` and placing it in the translation folder static > abri > computer > `language to add` > `louisBraille.jpg`.
- Create a new audio file in the target language with the keyword to be guessed in the deafness test and place it in the translation folder static > surface > laboratory > audiovisual_room > `language to add` > `nodeaf.mp3`.
- Create 5 new audios in the target language to vocalize the input field and place them in the translation folder:
    - static > sound > accessibleName > `language to add` > `firstName.mp3`
    - static > sound > accessibleName > `language to add` > `surname.mp3`
    - static > sound > accessibleName > `language to add` > `birthdate.mp3`
    - static > sound > accessibleName > `language to add` > `deathDay.mp3`
    - static > sound > accessibleName > `language to add` > `submit.mp3`
- Adjust the helpers according to your translation in `src > lib > index.ts`:
  - ABRI_MEDICAL
  - ABRI MEDICAL
  - SURFACE_LABORATORY
  - SURFACE_LABORATORY_AUDIOVISUAL_ROOM

## link
### tree
#### /<lang>
#### <lang>/waitingroom
#### <lang>/abri/entrance
#### <lang>/abri/computer
#### <lang>/abri/medical
#### <lang>/abri/searchcenter
#### <lang>/surface/entrance
#### <lang>/surface/laboratory
#### <lang>/surface/laboratory/audiovisualroom
#### <lang>/surface/laboratory/sanctuary
#### <lang>/final
