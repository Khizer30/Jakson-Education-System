import Head from "next/head" ;
// ...
import { useAuth } from "../lib/AuthContext" ;

// Custom 404
function Custom404(): JSX.Element
{
  // Variable
  const { user } = useAuth()! ;

  return (
  <>
    <Head>
      <title> JES | 404 Page </title>

      <meta name="description" content="404 Page" />
      <meta name="keywords" content="JES, 404, Page" />
    </Head>

    <div className={ "container-fluid d-flex justify-content-center align-items-center " + (user ? "animationHeight2" : "animationHeight1") }>
      <div className="d-sm-flex flex-column justify-content-sm-center align-items-sm-center">
        <h1 className="notFoundH1"> 404 </h1>
        <h2 className="notFoundH2"> Page Not Found </h2>
      </div>
    </div>
  </>
  )
}

// Export Custom 404
export default Custom404 ;