import { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { db } from "../../config/firebase" ;
import { createResponse } from "../../lib/Library" ;

// GET
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: object = {} ;
  let gradesCollection = await db.collection("JES").doc("Student Record").listCollections() ;

  for(let i: number = 0; i < gradesCollection.length; i++)
  {
    let students: string[] = [] ;
    let docSnapshot = await gradesCollection[i].get() ;

    docSnapshot.forEach((student) =>
    {
      students.push(student.id) ;
    }) ;

    data = { ...data, [gradesCollection[i].id]: students } ;
  }

  res.end(createResponse(100, JSON.stringify(data))) ;
}