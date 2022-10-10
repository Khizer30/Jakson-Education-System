import type { NextApiRequest, NextApiResponse } from "next" ;
// ...
import { createResponse } from "../../lib/Library" ;
import type { ReCAPTCHARequest, ReCAPTCHAResponse } from "../../lib/Library" ;

// Verify
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
{
  let data: ReCAPTCHARequest = req.body ;

  try
  {
    let response: Response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.SECRET_KEY! }&response=${ data.token }`, 
    {
      mode: "cors",
      method: "POST"
    }) ;
    let result: ReCAPTCHAResponse = await response.json() ;

    res.end(createResponse(100, JSON.stringify(result))) ;
  }
  catch
  {
    res.end(createResponse(400, "*Error Connecting To Google!")) ;
  }
}