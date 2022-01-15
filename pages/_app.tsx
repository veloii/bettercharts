import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navigation from "../components/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navigation />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
