import type { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { db } from "../../../config/firebase" ;
import { checkInput, createResponse } from "../../../lib/Library" ;
import type { RemoveReq } from "../../../lib/Library" ;

// Remove
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: RemoveReq = req.body ;

  if (checkInput(data.grade, 50) &&
  checkInput(data.name, 50, "^[a-zA-Z].*[\s\.]*$"))
  {
    try
    {
      let docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> = db.collection("JES").doc("Student Record").collection(data.grade).doc(data.name) ;
      await docRef.delete() ;
      
      res.end(createResponse(100, `${ data.name } Removed from Database!`)) ;
    }
    catch
    {
      res.end(createResponse(400, "Error Connecting To Firebase!")) ;
    }
  }
  else
  {
    res.end(createResponse(500, "Invalid Data Recieved!")) ;
  }
}