import Modal from 'react-modal';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/auth';

import '../styles/globals.scss';
import Head from 'next/head';
Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="google" content="notranslate" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="googlebot" content="noindex,nofollow" />

        <meta name="theme-color" content="#B22E6F" />
        <meta name="author" content="Gustavo Nunes Teixeira" />
        <meta name="description" content="ioasys Books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="ioasys Books" />
        <meta property="og:description" content="ioasys Books" />

        <link rel="shortcut icon" href="./favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
