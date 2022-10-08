import { useEffect } from "react" ;
import { useRouter } from "next/router" ;
import type React from "react" ;
import type { NextRouter } from "next/router" ;
// ...
import { useAuth } from "./AuthContext" ;

// Protected Route
function ProtectedRoute({ children }: { children: React.ReactNode }): JSX.Element
{
  const router: NextRouter = useRouter() ;
  const { user } = useAuth()! ;

  useEffect(() =>
  {
    if (!user)
    {
      router.push("/login") ;
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