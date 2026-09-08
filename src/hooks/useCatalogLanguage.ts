"use client";

import { useTranslation } from "react-i18next";

export default function useCatalogLanguage() {
  const { i18n } = useTranslation();
  const isChinese = i18n.language.startsWith("zh");

  return {
    isChinese,
    localize: (portuguese: string, chinese: string) =>
      isChinese && chinese ? chinese : portuguese
  };
}
