import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#ED7D31", contrastText: "#fff" },
    shadow: { main: "#F0F0F0", contrastText: "#fff", hover: "#fbf9f9" },
    neutral: {
      main: "#616161",
      contrastText: "#fff",
    },
  },
  components: {
    // Name of the component
    MuiDivider: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          marginBottom: 4,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "#D9D9D9",
        },
      },
    },
  },
});
