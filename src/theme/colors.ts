export type Palette = {
  bg: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  brand: string;
  brandSoft: string;
  positive: string;
  warning: string;
  shadow: string;
};

export function getPalette(isDark: boolean): Palette {
  const BRACCO_ORANGE = "#ED5522";
  const BRACCO_INK = "#2A2015";

  return isDark
    ? {
        bg: "#0B0B0B",
        card: "#121212",
        text: "#FFFFFF",
        subtext: "rgba(255,255,255,0.70)",
        border: "rgba(255,255,255,0.14)",
        brand: BRACCO_ORANGE,
        brandSoft: "rgba(237,85,34,0.20)",
        positive: "#2EA043",
        warning: "#FFB020",
        shadow: "rgba(0,0,0,0.60)",
      }
    : {
        bg: "#FFF6F0",
        card: "#FFFFFF",
        text: BRACCO_INK,
        subtext: "rgba(42,32,21,0.70)",
        border: "rgba(42,32,21,0.28)",
        brand: BRACCO_ORANGE,
        brandSoft: "rgba(237,85,34,0.14)",
        positive: "#2EA043",
        warning: "#D97706",
        shadow: "rgba(0,0,0,0.10)",
      };
}
