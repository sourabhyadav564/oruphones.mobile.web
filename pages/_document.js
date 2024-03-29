import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="googlebot" content="noindex,nofollow" /> */}
          {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />  */}
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.ico"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body className="font-open-sans">
          <Main />
          <NextScript />
          <script src="/restrict.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
