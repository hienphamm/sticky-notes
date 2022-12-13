import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import AuthContextProvider from "./contexts/AuthContext";
import { Routes } from "./routes";
import CategoryContextProvider from "./contexts/CategoryContext";

const theme = createTheme({
  palette: {
    primary: {
      main: `#3366ff`,
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontSize: "1rem",
    },
  },
});

function App(): ReactElement {
  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        autoHideDuration={2000}
      >
        <AuthContextProvider>
          <CategoryContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
          </CategoryContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
