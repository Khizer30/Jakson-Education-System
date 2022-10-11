import type { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { db } from "../../../config/firebase" ;
import { checkInput, checkNumber, createResponse } from "../../../lib/Library" ;
import type { Student } from "../../../lib/Library" ;

// Add
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: Student = req.body ;

  if (checkInput(data.name, 50, "^[a-zA-Z].*[\s\.]*$") &&
  checkInput(data.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
  checkInput(data.reg, 50) &&
  checkInput(data.grade, 50) &&
  checkNumber(data.fees) &&
  checkNumber(data.arrears))
  {
    try
    {
      let docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> = db.collection("JES").doc("Student Record").collection(data.grade).doc(data.name) ;
      await docRef.set({ father: data.father, reg: data.reg, fees: +data.fees, arrears: +data.arrears }) ;
      
      res.end(createResponse(100, `${ data.name } Added To Database!`)) ;
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