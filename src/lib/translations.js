import i18n from 'sveltekit-i18n';
import lang from './lang.json';
import {page} from "$app/stores"

// setup loaders & translations from lang.json data
function createLocaleLoader(localeCode) {
    return {
        locale: localeCode,
        key: '',
        loader: async () => (await import(`../locales/${localeCode}.json`)).default
    };
}

const availableLocales = Object.keys(lang);
const translations = {};
const loaders = []
for (let i = 0; i < availableLocales.length; i++) {
    translations[availableLocales[i]] = {lang};
    loaders.push({
        locale: availableLocales[i],
        key: 'common',
        loader: async () => (await import((`../locales/${availableLocales[i]}/common.json`))).default
    })
    loaders.push({
        locale: availableLocales[i],
        key: 'intro',
        loader: async () => (await import((`../locales/${availableLocales[i]}/intro.json`))).default
    })
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'waitingRoom',
            loader: async () => (await import(`../locales/${availableLocales[i]}/waitingRoom.json`)).default
        })
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'shelterEntrance',
            loader: async () => (await import(`../locales/${availableLocales[i]}/shelter/entrance.json`)).default
        })
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'shelterComputerRoom',
            loader: async () => (await import(`../locales/${availableLocales[i]}/shelter/computerRoom.json`)).default
        })
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'shelterMedicalRoom',
            loader: async () => (await import(`../locales/${availableLocales[i]}/shelter/medicalRoom.json`)).default
        }
    )
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'shelterSearchCenterRoom',
            loader: async () => (await import(`../locales/${availableLocales[i]}/shelter/searchCenterRoom.json`)).default
        }
    )
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'surfaceEntrance',
            loader: async () => (await import(`../locales/${availableLocales[i]}/surface/entrance.json`)).default
        }
    )
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'surfaceLaboratory',
            loader: async () => (await import(`../locales/${availableLocales[i]}/surface/laboratory/entrance.json`)).default
        }
    )
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'audiovisualRoom',
            loader: async () => (await import(`../locales/${availableLocales[i]}/surface/laboratory/audiovisualRoom.json`)).default
        }
    )
    loaders.push(
        {
            locale: availableLocales[i],
            key: 'sanctuary',
            loader: async () => (await import(`../locales/${availableLocales[i]}/surface/laboratory/sanctuary.json`)).default
        }
    )


    loaders.push(
        {
            locale: availableLocales[i],
            key: 'outro',
            loader: async () => (await import(`../locales/${availableLocales[i]}/outro.json`)).default
        })
}

availableLocales.map(createLocaleLoader);
const config = ({
    initLocale: 'fr',
    translations: translations,
    loaders: loaders
});

export const {t, loading, locales, locale, setLocale, getTranslationProps } = new i18n(config);
