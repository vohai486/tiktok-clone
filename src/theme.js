import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    background: {
      default: "rgb(255, 255, 255)",
    },
    backgroundHeader: {
      main: "rgba(255, 255, 255, 1)",
      red: "red",
    },
    text: {
      primary: "rgb(22, 24, 35)",
    },
  },
  typography: {
    fontFamily: `"IBM Plex Sans","sans-serif"`,
  },
});
