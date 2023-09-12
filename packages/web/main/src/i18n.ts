import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";
import * as enTranslations from "./loc/en";
import * as deTranslations from "./loc/de";
import { i18nextPlugin } from "translation-check";
import Backend from "i18next-locize-backend";

const locizeOptions = {
  projectId: "67fdb998-4b88-4ce0-9627-8edcc2e1ba7f",
  apiKey: "6e6a86b0-f83d-4386-896b-dcc26f712bc8",
  referenceLng: "en",
};

export const defaultNS = "translation";
export const resources = {
  en: { translation: enTranslations },
  de: { translation: deTranslations },
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

const lngs: { [key in LngCode]: { nativeName: string } } = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

type LngCode = "en" | "de";

export const lngCodes = Object.keys(lngs) as LngCode[];

export const useI18Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: LngCode) => {
    i18n.changeLanguage(lng);
  };

  const resolvedLanguage = i18n.resolvedLanguage as LngCode;

  return { lngs, lngCodes, changeLanguage, resolvedLanguage };
};

export default i18n;
