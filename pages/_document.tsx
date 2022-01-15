import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="cursor-default">
        <Head>
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/HeyAugust.woff2"
          />
          <link rel="preload" as="image" href="waves.webp" />

          <meta name="title" content="Zelr Portfolio" />
          <meta
            name="description"
            content="Hi, I am currently working on Netor Bot and I am intrested in NextJS 12 and automating with Javascript (TS)."
          />
          <meta
            name="keywords"
            content="zellr, nextjs, portfolio, react, javascript, js, ts, typescript"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="5 days" />
          <meta name="author" content="zelr" />
          <meta property="og:title" content="Zelr Portfolio" />
          <meta
            property="og:description"
            content="Hi, I am currently working on Netor Bot and I am intrested in NextJS 12 and automating with Javascript (TS)."
          />
          <meta property="og:url" content="https://zelr.me/" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
