import { initializeApp } from "firebase/app" ;
import { getAuth } from "firebase/auth" ;
import type { Auth } from "firebase/auth" ;

const firebaseConfig: object = 
{
  apiKey: "AIzaSyD_SCf2aCEA1wwxkxoKP-oy2PPpSSY8BB4",
  authDomain: "jaksoneducationsystem.firebaseapp.com",
  databaseURL: "https://jaksoneducationsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jaksoneducationsystem",
  storageBucket: "jaksoneducationsystem.appspot.com",
  messagingSenderId: "497612721967",
  appId: "1:497612721967:web:a7303029aee5ae22bb1bda"
} ;

// Initialize
const app = initializeApp(firebaseConfig) ;
const auth: Auth = getAuth() ;

// Export
export { auth } ;