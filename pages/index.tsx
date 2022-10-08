import Head from "next/head" ;
import { useRouter } from "next/router" ;
import type { NextRouter } from "next/router" ;
// ...
import { useAuth } from "../lib/AuthContext" ;

// Home
function Home(): JSX.Element
{
  const router: NextRouter = useRouter() ;
  const { user } = useAuth()! ;

  if (user)
  {
    router.replace("/dashboard") ;
  }
  else
  {
    router.replace("/login") ;
  }

  return (
  <>
    <Head>
      <title> Redirect </title>

      <meta name="description" content="Redirect" />
      <meta name="keywords" content="JES, Redirect" />
    </Head>
  </>
  )
}

// Export Home
export default Home ;