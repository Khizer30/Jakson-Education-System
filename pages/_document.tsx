import { Html, Head, Main, NextScript } from "next/document" ;
import Script from "next/script" ;

// Document
function Document(): JSX.Element
{
  return (
  <>
    <Html lang="EN">
      <Head>
        <meta name="author" content="Syed Muhammad Khizer" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen&amp;display=swap" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
      
        <link rel="icon" type="image/x-icon" href="/images/favicon.webp" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.webp" />

        <meta name="application-name" content="JES Portal" />
        <meta name="description" content="Jakson Education System Portal" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#282D3C" />

        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-tap-highlight" content="no" />
      </Head>

      <body>
        <Main />
        <NextScript />

        <footer>
          <p className="footerP"> @ Jakson Education System </p>
        </footer>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/animation.js" strategy="afterInteractive" />
      </body>
    </Html>
  </>
  )
}

// Export Document
export default Document ;