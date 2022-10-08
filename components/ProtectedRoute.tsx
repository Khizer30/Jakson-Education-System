import { useEffect } from "react" ;
import { useRouter } from "next/router" ;
import type { NextRouter } from "next/router" ;
// ...
import { useAuth } from "../components/AuthContext" ;

// Props
interface Props
{
  children: React.ReactNode ;
}

// Protected Route
function ProtectedRoute({ children }: Props): JSX.Element
{
  const router: NextRouter = useRouter() ;
  const { user } = useAuth()! ;

  useEffect(() =>
  {
    if (!user)
    {
      router.replace("/login") ;
    }
  }, [router, user]) ;

  return (
  <>
    { user ? children : null }
  </>
  )
}

// Export Protected Route
export default ProtectedRoute ;