import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import Layout from "./components/Layout";
import { Routes } from "./routes";
import AuthContextProvider from "./contexts/AuthContext";

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
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Routes />
            </Layout>
          </ThemeProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
