import Head from "next/head" ;
import Image from "next/image" ;
import Link from "next/link" ;
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
  const { user } = useAuth()! ;
  let greetings: string = "Assalam Walekum" ;

  if (user?.displayName)
  {
    greetings = `Assalam Walekum, ${ user.displayName }` ;
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
            <Link href="/print">
              <a className="dashboardImage">
                <Image
                  src={ printImg }
                  alt="Clipart"
                  layout="intrinsic"
                  placeholder="blur"
                  priority
                  draggable="false"
                />
              </a>
            </Link>

            <Link href="/edit">
              <a className="dashboardImage">
                <Image
                  src={ editImg }
                  alt="Clipart"
                  layout="intrinsic"
                  placeholder="blur"
                  priority
                  draggable="false"
                />
              </a>
            </Link>
          </div>

          <div className="col d-flex flex-column justify-content-center align-items-center">
            <Link href="/add">
              <a className="dashboardImage">
                <Image
                  src={ addImg }
                  alt="Clipart"
                  layout="intrinsic"
                  placeholder="blur"
                  priority
                  draggable="false"
                />
              </a>
            </Link>

            <Link href="/remove">
              <a className="dashboardImage">
                <Image
                  src={ removeImg }
                  alt="Clipart"
                  layout="intrinsic"
                  placeholder="blur"
                  priority
                  draggable="false"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

// Export Dashboard
export default Dashboard ;