import Modal from "react-modal";
import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/auth";

import "../styles/globals.scss";
Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
