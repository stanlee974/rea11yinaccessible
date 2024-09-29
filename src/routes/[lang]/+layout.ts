import { loadTranslations } from '$lib/translations';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, params }) => {
  const { pathname } = url;

  const initLocale = params.lang || 'fr';

  await loadTranslations(initLocale, pathname);

  return {};
}