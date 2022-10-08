import { useState, useEffect, useContext, createContext } from "react" ;
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth" ;
import type { Unsubscribe, User, UserCredential } from "firebase/auth" ;
// ...
import { auth } from "../config/auth" ;
import type { AuthInterface } from "../lib/Library" ;

const AuthContext = createContext<AuthInterface | undefined>(undefined) ;
const useAuth = () => useContext(AuthContext) ;

// Props
interface Props
{
  children: React.ReactNode ;
}

// Auth Context Provider
function AuthContextProvider({ children }: Props): JSX.Element
{
  // Variables
  const [user, setUser] = useState<User | null>(null) ;
  const [loading, setLoading] = useState<boolean>(true) ;

  // Set User
  useEffect(() =>
  {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user: User | null) =>
    {
      if (user)
      {
        setUser(user) ;
      }
      else
      {
        setUser(null) ;
      }

      setLoading(false) ;
    }) ;

    return () => unsubscribe() ;
  }, []) ;

  // Log In User
  function logInUser(email: string, password: string): Promise<UserCredential>
  {
    return signInWithEmailAndPassword(auth, email, password) ;
  }

  // Log Out User
  async function logOutUser(): Promise<void>
  {
    await signOut(auth) ;
  }

  return (
  <>
    <AuthContext.Provider value={{ user, logInUser, logOutUser }}>
      { loading ? null : children }
    </AuthContext.Provider>
  </>
  )
}

// Export
export { useAuth } ;

// Export Auth Context Provider
export default AuthContextProvider ;