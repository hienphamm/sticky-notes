import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CssBaseline } from "@mui/material";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes } from "./routes";

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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
