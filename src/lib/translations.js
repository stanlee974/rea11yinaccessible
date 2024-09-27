import i18n from 'sveltekit-i18n';
import lang from './lang.json';

const availableLocales = Object.keys(lang);
const translations = {};
const loaders = [];

availableLocales.forEach((currentLocale) => {
    translations[currentLocale] = {lang};

    loaders.push(
        {
            locale: currentLocale,
            key: 'common',
            loader: async () => (await import(`../locales/${currentLocale}/common.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'intro',
            loader: async () => (await import(`../locales/${currentLocale}/intro.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'waitingRoom',
            loader: async () => (await import(`../locales/${currentLocale}/waitingRoom.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'shelterEntrance',
            loader: async () => (await import(`../locales/${currentLocale}/shelter/entrance.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'shelterComputerRoom',
            loader: async () => (await import(`../locales/${currentLocale}/shelter/computerRoom.json`)).default
        }
    )
    loaders.push(
        {
            locale: currentLocale,
            key: 'shelterMedicalRoom',
            loader: async () => (await import(`../locales/${currentLocale}/shelter/medicalRoom.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'shelterSearchCenterRoom',
            loader: async () => (await import(`../locales/${currentLocale}/shelter/searchCenterRoom.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'surfaceEntrance',
            loader: async () => (await import(`../locales/${currentLocale}/surface/entrance.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'surfaceLaboratory',
            loader: async () => (await import(`../locales/${currentLocale}/surface/laboratory/entrance.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'audiovisualRoom',
            loader: async () => (await import(`../locales/${currentLocale}/surface/laboratory/audiovisualRoom.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'sanctuary',
            loader: async () => (await import(`../locales/${currentLocale}/surface/laboratory/sanctuary.json`)).default
        }
    )

    loaders.push(
        {
            locale: currentLocale,
            key: 'outro',
            loader: async () => (await import(`../locales/${currentLocale}/outro.json`)).default
        }
    )
})

const config = ({
    initLocale: 'fr',
    fallbackLocale: 'fr',
    loaders,
    translations
});

export const { t, loading, locales, locale, setLocale, loadTranslations } = new i18n(config);
