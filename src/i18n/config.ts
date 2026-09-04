import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "@/i18n/locales/pt.json";
import zh from "@/i18n/locales/zh.json";

const defaultLanguage = "zh";

const savedLanguage =
  typeof window !== "undefined"
    ? localStorage.getItem("smbb-language") || defaultLanguage
    : defaultLanguage;

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      pt: { translation: pt },
      zh: { translation: zh }
    },
    lng: savedLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false
    },
    returnObjects: false
  });
}

export const supportedLanguages = [
  { value: "pt", label: "Português" },
  { value: "zh", label: "简体中文" }
];

export const setLanguage = (language: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("smbb-language", language);
  }

  i18next.changeLanguage(language);
};

export default i18next;
