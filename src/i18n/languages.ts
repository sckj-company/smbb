export type Language = "pt" | "zh";

export const defaultLanguage: Language = "pt";

export const languages: Record<Language, string> = {
  zh: "简体中文",
  pt: "Português"
};

export const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return defaultLanguage;

  const savedLanguage = localStorage.getItem("smbb-language");
  return savedLanguage === "zh" ? "zh" : "pt";
};
