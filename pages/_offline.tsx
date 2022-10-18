import Head from "next/head" ;
// ...
import { useAuth } from "../components/AuthContext" ;

// Offline
function Offline(): JSX.Element
{
  // Variable
  const { user } = useAuth()! ;

  return (
  <>
    <Head>
      <title> JES | Offline </title>

      <meta name="description" content="Offline Page" />
      <meta name="keywords" content="JES, Offline, Page" />
    </Head>

    <div className={ "container-fluid d-flex justify-content-center align-items-center" + (user ? " animationHeight2" : " animationHeight1") }>
      <div className="d-sm-flex flex-column justify-content-sm-center align-items-sm-center">
        <h1 className="notFoundH1"> ERROR </h1>
        <h2 className="notFoundH2"> You Are Offline </h2>
      </div>
    </div>
  </>
  )
}

// Export Offline
export default Offline ;