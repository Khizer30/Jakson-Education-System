import { useState, useEffect } from "react" ;
import { useRouter } from "next/router" ;
import type { AppProps } from "next/app" ;
import type { NextRouter } from "next/router" ;
// ...
import Loading from "../components/Loading" ;
import Navbar from "../components/Navbar" ;
import "../styles/global.css" ;

// App
function App({ Component, pageProps }: AppProps): JSX.Element
{
  const router: NextRouter = useRouter() ;
  const [loading, setLoading] = useState<boolean>(false) ;

  useEffect(() => 
  {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true) ;
    const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 1000) ;

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
    <Navbar />

    { loading &&
      <Loading />
    }

    <div className={ loading ? "displayNone" : "" }>
      <Component { ...pageProps } />
    </div>
  </>
  )
}

// Export App
export default App ;