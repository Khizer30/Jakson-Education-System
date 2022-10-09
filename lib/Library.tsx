import type { User, UserCredential } from "firebase/auth" ;

// Student Interface
interface Student
{
  name: string ;
  father: string ;
  reg: string ;
  grade: string ;
  fees: number  ;
  arrears: number ;
  date?: string ;
}

// Student Object
const studentObj: Student =
{
  name: "",
  father: "",
  reg: "",
  grade: "NULL",
  fees: 0,
  arrears: 0
} ;

// Student Object 2
const studentObj2: Student =
{
  name: "NULL",
  father: "",
  reg: "",
  grade: "NULL",
  fees: 0,
  arrears: 0,
  date: getDate("date")
} ;

// Remove Request Interface
interface RemoveReq
{
  grade: string ;
  name: string ;
}

// Remove Object
const removeObj: RemoveReq =
{
  grade: "NULL",
  name: "NULL"
} ;

// Get Request Interface
interface GetReq
{
  grade: string ;
  name: string ;
}

// Document Data Interface
interface DocData
{
  father: string ;
  reg: string ;
  fees: number ;
  arrears: number ;
}

// Log In Interface
interface LogIn
{
  email: string ;
  password: string ;
}

// Log In Object
const logInObj: LogIn =
{
  email: "",
  password: ""
} ;

// Auth Interface
interface AuthInterface
{
  user: User | null ;
  logInUser(email: string, password: string): Promise<UserCredential> ;
  logOutUser(): Promise<void> ;
}

// ReCAPTCHARequest
interface ReCAPTCHARequest
{
  token: string ;
}

// ReCAPTCHAResponse
interface ReCAPTCHAResponse
{
  success: boolean ;
  challenge_ts: string ;
  hostname: string ;
}

// Props Interface
interface Props
{
  data: string ;
}

// Res Interface
interface Res
{
  code: number | string ;
  message: string ;
}

// Error Interface
interface Error
{
  code: string ;
  message: string ;
}

// Grades
const grades: string[] = ["Playgroup", "Nursery", "KG", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V", "Grade VI"] ;

// Mapper
function mapper(x: string): JSX.Element
{
  return ( <option key={ x } value={ x } className="bold"> { x } </option> )
}

// Check Input
function checkInput(it: string, len: number, reg?: string): boolean
{
  if ((it !== "") && (it !== "NULL"))
  {
    if (it.length <= len)
    {
      if (reg)
      {
        let pattern: RegExp = new RegExp(reg) ;

        if (pattern.test(it))
        {
          return true ;
        }
        else
        {
          return false ;
        }
      }
      else
      {
        return true ;
      }
    }
    else
    {
      return false ;
    }
  }
  else
  {
    return false ;
  }
}

// Check Number
function checkNumber(it: number): boolean
{
  if ((it >= 0) && (it <= 99999))
  {
    return true ;
  }
  else
  {
    return false ;
  }
}

// Get API
async function getAPI(url: string): Promise<Res>
{
  const response: Response = await fetch(url, 
  {
    method: "GET",
    headers: 
    {
      "Content-Type": "application/json"
    }
  }) ;
  let res: Res = await response.json() ;

  return res ;
}

// Post API
async function postAPI(url: string, data: object): Promise<Res>
{
  const response: Response = await fetch(url, 
  {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }) ;
  let res: Res = await response.json() ;

  return res ;
}

// Create Response
function createResponse(code: number | string, message: string): string
{
  return JSON.stringify({ code: code, message: message }) ;
}

// Get Date
function getDate(type: string, value?: string): string
{
  let date: string = "" ;
  let today: Date = new Date() ;

  // Set Time
  if (value)
  {
    today = new Date(value) ;

    if (type === "due")
    {
      today.setMilliseconds(today.getMilliseconds() + 604800000) ;
    }
  }

  let dd: string = String(today.getDate()).padStart(2, "0") ;
  let mm: string = String(today.getMonth() + 1).padStart(2, "0") ;
  let yyyy: number = today.getFullYear() ;

  if (type === "date")
  {
    date = yyyy + "-" + mm + "-" + dd ;
  }
  else if ((type === "issue") || (type === "due"))
  {
    date = dd + "/" + mm + "/" + yyyy ;
  }
  else if (type === "month")
  {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"] ;
    
    date = monthNames[today.getMonth()] ;
  }

  return date ;
}

// Exports
export { studentObj, studentObj2, removeObj, logInObj, grades, mapper, checkInput, checkNumber, getAPI, postAPI, createResponse, getDate } ;
export type { Student, RemoveReq, GetReq, DocData, LogIn, AuthInterface, ReCAPTCHARequest, ReCAPTCHAResponse, Props, Res, Error } ;