import admin from "firebase-admin" ;
import { initializeApp, cert } from "firebase-admin/app" ;
import { getFirestore } from "firebase-admin/firestore" ;
import type { App } from "firebase-admin/app" ;
import type { Firestore } from "firebase-admin/firestore" ;

// Initialize
if (!admin.apps.length)
{
  const serviceAccount: object = JSON.parse(process.env.SERVICE_ACCOUNT!) ;
  const app: App = initializeApp({ credential: cert(serviceAccount) }) ;
}
const db: Firestore = getFirestore() ; 

// Export
export { db } ;