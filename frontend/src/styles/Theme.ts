import { createTheme } from "@mui/material";


export const googleLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a73e8",
    },
    background: {
      default: "linear-gradient(135deg, #6a85b6 0%, #bac8e0 100%)",
      paper: "#f8f9fa",
    },
    text: {
      primary: "#202124",
      secondary: "#b7b7b7",
    },
    divider: "#dadce0",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});