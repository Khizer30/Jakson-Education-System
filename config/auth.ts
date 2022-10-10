import { initializeApp } from "firebase/app" ;
import { getAuth } from "firebase/auth" ;
import type { Auth } from "firebase/auth" ;

// Initialize
const firebaseConfig: object = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!) ;
const app = initializeApp(firebaseConfig) ;
const auth: Auth = getAuth() ;

// Export
export { auth } ;