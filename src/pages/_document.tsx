import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="google" content="notranslate" />
          <meta name="robots" content="noindex,nofollow" />
          <meta name="google" content="nositelinkssearchbox" />
          <meta name="googlebot" content="noindex,nofollow" />

          <meta name="theme-color" content="#B22E6F" />
          <meta name="author" content="Gustavo Nunes Teixeira" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="icon" href="./favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
