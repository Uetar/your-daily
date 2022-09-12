import "../styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../shared/theme";
import { Context } from "./userContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Context>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Context>
    </>
  );
}

export default MyApp;
