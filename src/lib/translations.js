import i18n from 'sveltekit-i18n';
import lang from './lang.json';

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
for (let i = 0; i < availableLocales.length; i++) {
    translations[availableLocales[i]] = { lang };
}

availableLocales.map(createLocaleLoader);

const config = ({
    initLocale: 'fr',
    fallbackLocale: 'en',
    translations: translations,
    loaders: [
        {
            locale: 'fr',
            key: 'common',
            loader: async () => (await import('../locales/fr/common.json')).default
        },
        {
            locale: 'fr',
            key: 'intro',
            loader: async () => (await import('../locales/fr/intro.json')).default
        },
        {
            locale: 'fr',
            key: 'waitingRoom',
            loader: async () => (await import('../locales/fr/waitingRoom.json')).default
        },
        {
            locale: 'fr',
            key: 'outro',
            loader: async () => (await import('../locales/fr/outro.json')).default
        }
    ]
});

export const { t, loading, locales, locale, loadTranslations, setLocale } = new i18n(config);
