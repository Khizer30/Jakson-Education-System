import type { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { db } from "../../config/firebase" ;
import { createResponse, checkInput } from "../../lib/Library" ;
import type { GetReq } from "../../lib/Library" ;

// GET
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: GetReq = req.body ;

  if (checkInput(data.grade, 50) &&
  checkInput(data.name, 50, "^[a-zA-Z].*[\s\.]*$"))
  {
    try
    {
      let docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> = db.collection("JES").doc("Student Record").collection(data.grade).doc(data.name) ;
      let result = await docRef.get() ;
      
      res.end(createResponse(100, JSON.stringify(result.data()))) ;
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