import '../styles/globals.css'
import { CssBaseline } from "@mui/material";
import React from "react";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
