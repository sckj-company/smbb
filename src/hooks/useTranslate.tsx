"use client";

import { useEffect, useState } from "react";
import { setLanguage } from "@/i18n/config";
import { getInitialLanguage, type Language } from "@/i18n/languages";

export default function useTranslate() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  const handleLanguageChange = (value: string | null) => {
    if (!value) return;

    const nextLanguage = value as Language;
    setSelectedLanguage(nextLanguage);
    setLanguage(nextLanguage);
  };

  return { handleLanguageChange, selectedLanguage };
}
