import { useState } from "react" ;
import Head from "next/head" ;
import Image from "next/image" ;
import type React from "react" ;
// ...
import { db } from "../config/firebase" ;
// ...
import { removeObj, grades, mapper, postAPI } from "../lib/Library" ;
import Alert from "../components/Alert" ;
import type { RemoveReq, Props, Res } from "../lib/Library" ;
import img from "../public/images/remove.webp" ;

// SSR
export async function getServerSideProps()
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

  return { props: { data: JSON.stringify(data) } } ;
}

// Remove
function Remove(props: Props): JSX.Element
{
  // Variables
  const [data, setData] = useState<object>(JSON.parse(props.data)) ;
  const [inputs, setInputs] = useState<RemoveReq>(removeObj) ;
  const [students, setStudents] = useState<string[] | undefined>(undefined) ;
  const [message, setMessage] = useState<string>("") ;
  const [warn, setWarn] = useState<boolean>(true) ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void
  {
    let name: string = event.target.name ;
    let value: string = event.target.value ;

    setInputs((values: RemoveReq) => ({ ...values, [name]: value })) ;

    if (name === "grade")
    {
      inputs.name = "NULL" ;
      setStudents(data[value]) ;
    }
  }

  // Handle Submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void
  {
    event.preventDefault() ;
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
            setMessage("Invalid Input!") ;
            setWarn(true) ;
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
        setMessage("Input is Too Long!") ;
        setWarn(true) ;
        return false ;
      }
    }
    else
    {
      setMessage("Please, Complete The Form!") ;
      setWarn(true) ;
      return false ;
    }
  }

  // Send
  async function send(): Promise<void>
  {
    setMessage("") ;

    if (checkInput(inputs.grade, 50) &&
    checkInput(inputs.name, 50, "^[a-zA-Z].*[\s\.]*$"))
    {
      let res: Res = await postAPI("/api/remove", inputs) ;

      if (res.code === 100)
      {
        setWarn(false) ;

        let newData: object = {} ;
        let tempArr: string[] = data[inputs.grade] ;
        let index: number = tempArr.indexOf(inputs.name) ;
        
        tempArr.splice(index, 1) ;
        if (!tempArr.length)
        {
          newData = { ...data, [inputs.grade]: undefined } ;
        }
        else
        {
          newData = { ...data, [inputs.grade]: tempArr } ;
        }
   
        setData(newData) ;
      }
      else
      {
        setWarn(true) ;
      }

      setInputs(removeObj) ;
      setStudents(undefined) ;
      setMessage(res.message) ;
    }
  }

  return (
  <>
    <Head>
      <title> JES - Remove Student </title>

      <meta name="description" content="Remove Student from Database" />
      <meta name="keywords" content="JES, Remove, Student" />
    </Head>

    <div className="container-fluid mainMargin">
      <h1 className="heading"> Remove Student from Database </h1>
      <div className="row minHeight">
        
        <div className="col-md-6 d-flex justify-content-center align-items-center marginTB">
          <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="width100"
          autoComplete="off" noValidate onSubmit={ handleSubmit }>

            <Alert message={ message } warn={ warn } />

            <div className="form-floating mb-3 mt-3">
              <select name="grade" value={ inputs.grade } onChange={ handleChange } autoFocus required className="form-select textInput">
                <option value="NULL" disabled className="bold displayNone"> Select The Grade </option>
              {
                grades.map(mapper)
              }
              </select>
              <label htmlFor="grade" className="textInput"> Grade* </label>
            </div>

          { !students &&
            <div className="form-floating mb-3 mt-3 invisible">
              <select name="name" disabled className="form-select textInput">
                <option value="NULL" disabled className="bold displayNone"> Select The Student </option>
              </select>
              <label htmlFor="name" className="textInput"> Student* </label>
            </div>
          }

          { students &&
            <div className="form-floating mb-3 mt-3">
              <select name="name" value={ inputs.name } onChange={ handleChange } required className="form-select textInput">
                <option value="NULL" disabled className="bold displayNone"> Select The Student </option>
              {
                students.map(mapper)
              }
              </select>
              <label htmlFor="name" className="textInput"> Student* </label>
            </div>
          }

            <div className="d-flex justify-content-center align-items-center text-center">
              <button onClick={ send } type="button" className="d-flex justify-content-center align-items-center mainBtn"> Submit </button>
            </div>

          </form>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center marginTB">
          <div className="width75 scaler">
            <Image
              src={ img }
              alt="Clipart"
              layout="intrinsic"
              placeholder="empty"
              priority
              draggable="false"
            />
          </div>
        </div>

      </div>
    </div>
  </>
  )
}

// Export Remove
export default Remove ;