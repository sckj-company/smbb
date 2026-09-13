"use client";

import { startTransition, useEffect, useState } from "react";
import { setLanguage } from "@/i18n/config";
import { getInitialLanguage, type Language } from "@/i18n/languages";

export default function useTranslate() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("zh");

  useEffect(() => {
    document.documentElement.lang = selectedLanguage;
  }, [selectedLanguage]);

  useEffect(() => {
    const savedLanguage = getInitialLanguage();
    if (savedLanguage === "zh") return;

    startTransition(() => {
      setSelectedLanguage(savedLanguage);
      setLanguage(savedLanguage);
    });
  }, []);

  const handleLanguageChange = (value: string | null) => {
    if (!value) return;

    const nextLanguage = value as Language;
    setSelectedLanguage(nextLanguage);
    setLanguage(nextLanguage);
  };

  return { handleLanguageChange, selectedLanguage };
}
