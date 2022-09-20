// Student Interface
interface Student
{
  name: string ;
  father: string ;
  reg: string ;
  grade: string ;
  fees: number  ;
  arrears: number ;
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

// Res Interface
interface Res
{
  code: number | string ;
  message: string ;
}

// Grades
const grades: string[] = ["Playgroup", "Nursery", "KG", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V", "Grade VI"] ;

// Grades Mapper
function gradesMapper(x: string): JSX.Element
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
  if (it)
  {
    if ((it <= 99999) && (it >= 0))
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

// Exports
export { studentObj, grades, gradesMapper, checkInput, checkNumber, getAPI, postAPI, createResponse } ;
export type { Student, Res } ;