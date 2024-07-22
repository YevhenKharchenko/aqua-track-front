import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // Використовуйте i18next-http-backend для завантаження файлів
import LanguageDetector from 'i18next-browser-languagedetector'; // Додайте детектор мови

i18n
  .use(Backend) // Використовуйте http-backend для завантаження файлів
  .use(LanguageDetector) // Додайте детектор мови
  .use(initReactI18next)
  .init({
    lng: 'en', // Мова за замовчуванням
    fallbackLng: 'en', // Мова для резервного використання
    debug: true, // Виводити помилки у консоль
    backend: {
      // Шляхи до файлів перекладу
      loadPath: './locales/{{lng}}/translation.json'
    },
    interpolation: {
      escapeValue: false // React вже обробляє escape HTML
    },
    react: {
      useSuspense: false // Використовувати Suspense для завантаження перекладів
    }
  });

export default i18n;
