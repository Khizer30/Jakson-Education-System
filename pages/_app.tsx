import { useState, useEffect } from "react" ;
import { useRouter } from "next/router" ;
import Head from "next/head" ;
import type { AppProps } from "next/app" ;
import type { NextRouter } from "next/router" ;
// ...
import AuthContextProvider from "../components/AuthContext" ;
import Routes from "../components/Routes" ;
import "../styles/global.css" ;

// App
function App({ Component, pageProps }: AppProps): JSX.Element
{
  const router: NextRouter = useRouter() ;
  const [loading, setLoading] = useState<boolean>(false) ;

  useEffect(() => 
  {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true) ;
    const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 500) ;

    router.events.on("routeChangeStart", handleStart) ;
    router.events.on("routeChangeComplete", handleComplete) ;
    router.events.on("routeChangeError",  handleComplete) ;

    return () => 
    {
      router.events.off("routeChangeStart", handleStart) ;
      router.events.off("routeChangeComplete", handleComplete) ;
      router.events.off("routeChangeError", handleComplete) ;
    }
  }) ;

  return (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </Head>

    <AuthContextProvider>
      <Routes loading={ loading } path={ router.pathname }>
        <Component { ...pageProps } />
      </Routes>
    </AuthContextProvider>
  </>
  )
}

// Export App
export default App ;