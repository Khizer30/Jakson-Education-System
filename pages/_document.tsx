import { Html, Head, Main, NextScript } from "next/document" ;
import Script from "next/script" ;

// Document
function Document(): JSX.Element
{
  return (
  <>
    <Html lang="EN">
      <Head>

      </Head>

      <body>
        <Main />
        
        <NextScript />
      </body>
    </Html>
  </>
  )
}

// Export Document
export default Document ;