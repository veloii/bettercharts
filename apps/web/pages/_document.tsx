import { Box } from "@mantine/core";
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
      <Html lang="en" className="w-full h-full">
        <Head>
          <meta name="title" content="BetterCharts" />
          <meta
            name="description"
            content="An unoffical cleaner version of the ClassCharts for Students"
          />
          <meta
            name="keywords"
            content="class, charts, classcharts, better, bettercharts, better classcharts, better class charts, class charts"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="5 days" />
          <meta name="author" content="zelr" />
          <meta property="og:title" content="BetterCharts" />
          <meta
            property="og:description"
            content="Unoffical cleaner version of ClassCharts"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fffff" />
          <meta property="og:url" content="https://bettercharts.zelr.me/" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="w-full h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
