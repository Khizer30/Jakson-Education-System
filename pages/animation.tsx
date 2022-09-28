import Head from "next/head" ;
// ...
import Loading from "../components/Loading" ;

// Animation
function Animation(): JSX.Element
{
  return (
  <>
    <Head>
      <title> JES | Animation </title>

      <meta name="description" content="Animation" />
      <meta name="keywords" content="JES, Animation" />
    </Head>

    <Loading />
  </>
  )
}

// Export Animation
export default Animation ;