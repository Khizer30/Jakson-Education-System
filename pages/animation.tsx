import Head from "next/head" ;
// ...
import Loading from "../components/Loading" ;
import { useAuth } from "../components/AuthContext" ;

// Animation
function Animation(): JSX.Element
{
  // Variable
  const { user } = useAuth()! ;

  return (
  <>
    <Head>
      <title> JES | Animation </title>

      <meta name="description" content="Animation" />
      <meta name="keywords" content="JES, Animation" />
    </Head>

    <Loading fullScreen={ (user ? false : true) } />
  </>
  )
}

// Export Animation
export default Animation ;