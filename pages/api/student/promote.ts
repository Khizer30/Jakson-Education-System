import type { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { db } from "../../../config/firebase" ;
import { checkInput, checkNumber, createResponse } from "../../../lib/Library" ;
import type { Student } from "../../../lib/Library" ;

// Promote
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: Student = req.body ;

  if (checkInput(data.grade, 50) &&
  checkInput(data.name, 50, "^[a-zA-Z].*[\s\.]*$") &&
  checkInput(data.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
  checkInput(data.reg, 50) &&
  checkNumber(data.fees) &&
  checkNumber(data.arrears) &&
  checkInput(data.newClass!, 50))
  {
    try
    {
      let docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> = db.collection("JES").doc("Student Record").collection(data.newClass!).doc(data.name) ;
      await docRef.set({ father: data.father, reg: data.reg, fees: +data.fees, arrears: +data.arrears }) ;

      await db.collection("JES").doc("Student Record").collection(data.grade).doc(data.name).delete() ;

      res.end(createResponse(100, `${ data.name } Moved To ${ data.newClass! }!`)) ;
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