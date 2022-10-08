// ...
import { useAuth } from "./AuthContext" ;
import Loading from "./Loading" ;
import Navbar from "./Navbar" ;
import ProtectedRoute from "./ProtectedRoute" ;

// Props
interface Props
{
  loading: boolean ;
  path: string ;
  children: React.ReactNode ;
}

// Routes
function Routes({ loading, path, children }: Props): JSX.Element
{
  // Variables
  const { user } = useAuth()! ;
  const authRequired: string[] = ["/dashboard", "/print", "/add", "/remove", "/edit"] ;

  function OpenRoutes(): JSX.Element
  {
    return (
    <>
      { children }
    </>
    )
  }

  function ClosedRoutes(): JSX.Element
  {
    return (
    <>
      <ProtectedRoute>
        { children }
      </ProtectedRoute>
    </>
    )
  }

  return (
  <>
  { user &&
    <Navbar />
  }

  { loading &&
    <Loading fullScreen={ (user ? false : true) } />
  }

    <div className={ loading ? "displayNone" : "" }>
      { authRequired.includes(path) ? <ClosedRoutes /> : <OpenRoutes /> }
    </div>
  </>
  )
}

// Export Routes
export default Routes ;