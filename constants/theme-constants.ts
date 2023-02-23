type Theme = {
  value: string;
  i18n: {
    en: string;
    no: string;
  };
};

type ThemeConstants = {
  LIGHT: Theme;
  DARK: Theme;
  SYSTEM: Theme;
};

const THEME_CONSTANTS: ThemeConstants = {
  LIGHT: {
    value: "light",
    i18n: {
      en: "Light",
      no: "Lys",
    },
  },
  DARK: {
    value: "dark",
    i18n: {
      en: "Dark",
      no: "Mørk",
    },
  },
  SYSTEM: {
    value: "system",
    i18n: {
      en: "System",
      no: "System",
    },
  },
};

export { THEME_CONSTANTS };
export type { ThemeConstants, Theme };
