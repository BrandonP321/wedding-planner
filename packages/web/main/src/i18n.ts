import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enHome from "./loc/en/Home.json";
import deHome from "./loc/de/Home.json";
import { i18nextPlugin } from "translation-check";
import Backend from "i18next-locize-backend";

const locizeOptions = {
  projectId: "67fdb998-4b88-4ce0-9627-8edcc2e1ba7f",
  apiKey: "6e6a86b0-f83d-4386-896b-dcc26f712bc8",
  referenceLng: "en",
};

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: {
      home: enHome,
    },
  },
  de: {
    translation: {
      home: deHome,
    },
  },
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .use(i18nextPlugin)
  // .use(Backend)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false }, // React already does escaping
    resources,
    // backend: locizeOptions,
  });

export const t = i18n.t;

export default i18n;
