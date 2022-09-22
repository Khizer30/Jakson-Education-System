import Head from "next/head" ;

// Custom 404
function Custom404(): JSX.Element
{
  return (
  <>
    <Head>
      <title> JES - 404 Page </title>

      <meta name="description" content="404 Page" />
      <meta name="keywords" content="JES, 404, Page" />
    </Head>

    <div className="container-fluid d-flex justify-content-center align-items-center animationHeight">
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