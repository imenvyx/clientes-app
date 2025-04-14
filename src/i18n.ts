// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    defaultNS: 'translation',
    ns: ['translation'],
  });

void (async () => {
  try {
    await i18n.loadNamespaces('translation');
  } catch (error) {
    handleError('Error loading namespaces:', error);
  }
})();

function handleError(message: string, error: unknown): void {
  // Replace this with your custom error handling logic
  throw new Error(message);
}

export default i18n;
