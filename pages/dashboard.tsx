import { useRouter } from "next/router" ;
import Head from "next/head" ;
import Image from "next/image" ;
import type  { NextRouter } from "next/router" ;
// ...
import { useAuth } from "../components/AuthContext" ;
import printImg from "../public/images/print_link.webp" ;
import addImg from "../public/images/add_link.webp" ;
import editImg from "../public/images/edit_link.webp" ;
import removeImg from "../public/images/remove_link.webp" ;

// Dashboard
function Dashboard(): JSX.Element
{
  // Variables
  const router: NextRouter = useRouter() ;
  const { user } = useAuth()! ;
  let greetings: string = "Assalam Walekum" ;

  if (user?.displayName)
  {
    greetings = `Assalam Walekum, ${ user.displayName }` ;
  }

  // Linker
  function linker(path: string): void
  {
    router.push(path) ;
  }

  return (
  <>
    <Head>
      <title> JES | Dashboard </title>

      <meta name="description" content="JES Dashboard" />
      <meta name="keywords" content="JES, Dashboard" />
    </Head>

    <div className="container-fluid d-flex flex-column justify-content-center align-items-center dashboardContainer">
      <div>
        <h1 className="dashboardH1"> { greetings } </h1>
        <h1 className="dashboardH2"> What Do You Want To Do? </h1>
        <div className="row">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div onClick={ () => linker("/print") } className="dashboardImage">
              <Image
                src={ printImg }
                alt="Clipart"
                layout="intrinsic"
                placeholder="empty"
                priority
                draggable="false"
              />
            </div>

            <div onClick={ () => linker("/edit") } className="dashboardImage">
              <Image
                src={ editImg }
                alt="Clipart"
                layout="intrinsic"
                placeholder="empty"
                priority
                draggable="false"
              />
            </div>
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div onClick={ () => linker("/add") } className="dashboardImage">
              <Image
                src={ addImg }
                alt="Clipart"
                layout="intrinsic"
                placeholder="empty"
                priority
                draggable="false"
              />
            </div>

            <div onClick={ () => linker("/remove") } className="dashboardImage">
              <Image
                src={ removeImg }
                alt="Clipart"
                layout="intrinsic"
                placeholder="empty"
                priority
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

// Export Dashboard
export default Dashboard ;