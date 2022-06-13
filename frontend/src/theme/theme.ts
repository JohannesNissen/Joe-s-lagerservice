import { ColorMode, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark" as ColorMode,
  useSystemColorMode: true
};

const colors = {
  gray: {
    "50": "#F2F2F2",
    "100": "#E6E6E6",
    "200": "#CCCCCC",
    "300": "#B3B3B3",
    "400": "#999999",
    "500": "#808080",
    "600": "#666666",
    "700": "#4D4D4D",
    "800": "#333333",
    "900": "#1A1A1A"
  },
  red: {
    "50": "#FDEAE8",
    "100": "#F9C3BD",
    "200": "#F69D93",
    "300": "#F27769",
    "400": "#EE503F",
    "500": "#EB2A14",
    "600": "#BC2110",
    "700": "#8D190C",
    "800": "#5E1108",
    "900": "#2F0804"
  },
  orange: {
    "50": "#FFF5E5",
    "100": "#FFE4B8",
    "200": "#FFD38A",
    "300": "#FFC15C",
    "400": "#FFB02E",
    "500": "#FF9F00",
    "600": "#CC7F00",
    "700": "#995F00",
    "800": "#663F00",
    "900": "#332000"
  },
  yellow: {
    "50": "#FDFDE8",
    "100": "#F8F9BE",
    "200": "#F4F594",
    "300": "#EFF16A",
    "400": "#EBED40",
    "500": "#E6E817",
    "600": "#B8BA12",
    "700": "#8A8B0E",
    "800": "#5C5D09",
    "900": "#2E2E05"
  },
  green: {
    "50": "#EBFAEF",
    "100": "#C6F0D2",
    "200": "#A2E7B6",
    "300": "#7DDD99",
    "400": "#59D47C",
    "500": "#34CB5F",
    "600": "#2AA24C",
    "700": "#1F7A39",
    "800": "#155126",
    "900": "#0A2913"
  },
  teal: {
    "50": "#EFF6F5",
    "100": "#D2E4E4",
    "200": "#B5D3D3",
    "300": "#99C2C2",
    "400": "#7CB1B0",
    "500": "#5FA09F",
    "600": "#4C807F",
    "700": "#39605F",
    "800": "#264040",
    "900": "#132020"
  },
  cyan: {
    "50": "#E5FBFF",
    "100": "#B8F4FF",
    "200": "#8AECFF",
    "300": "#5CE5FF",
    "400": "#2EDEFF",
    "500": "#00D6FF",
    "600": "#00ABCC",
    "700": "#008199",
    "800": "#005666",
    "900": "#002B33"
  },
  blue: {
    "50": "#E8F3FC",
    "100": "#C0DCF7",
    "200": "#97C6F1",
    "300": "#6FAFEC",
    "400": "#4699E7",
    "500": "#1D82E2",
    "600": "#1868B4",
    "700": "#124E87",
    "800": "#0C345A",
    "900": "#061A2D"
  },
  purple: {
    "50": "#EFEAFB",
    "100": "#D2C4F3",
    "200": "#B59EEB",
    "300": "#9878E3",
    "400": "#7B52DB",
    "500": "#5E2CD3",
    "600": "#4C23A9",
    "700": "#391A7F",
    "800": "#261155",
    "900": "#13092A"
  },
  pink: {
    "50": "#FEE7F3",
    "100": "#FCBADC",
    "200": "#FA8EC6",
    "300": "#F862B0",
    "400": "#F73699",
    "500": "#F50A83",
    "600": "#C40869",
    "700": "#93064F",
    "800": "#620434",
    "900": "#31021A"
  }
};

export const theme1 = extendTheme({ config, colors });

export const theme2 = extendTheme({ config });

export default theme1;
