import { useState } from "react" ;
import Head from "next/head" ;
import type React from "react" ;
// ...
import { studentObj, grades, gradesMapper, postAPI } from "../lib/Library" ;
import Alert from "../components/Alert" ;
import type { Student, Res } from "../lib/Library" ;

// Add
function Add(): JSX.Element
{
  // Variables
  const [inputs, setInputs] = useState<Student>(studentObj) ;
  const [message, setMessage] = useState<string>("") ;
  const [warn, setWarn] = useState<boolean>(true) ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void
  {
    let name: string = event.target.name ;
    let value: string = event.target.value ;

    if ((name === "name") || (name === "father") || (name === "reg"))
    {
      value = value.toUpperCase() ;
    }

    setInputs((values: Student) => ({ ...values, [name]: value })) ;
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
        setMessage("Invalid Input!") ;
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

    if (checkInput(inputs.name, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.reg, 50) &&
    checkInput(inputs.grade, 50) &&
    checkNumber(inputs.fees))
    {
      let res: Res = await postAPI("/api/add", inputs) ;

      if (res.code === 100)
      {
        setWarn(false) ;
      }
      else
      {
        setWarn(true) ;
      }

      setInputs(studentObj) ;
      setMessage(res.message) ;
    }
  }

  return (
  <>
    <Head>
      <title> JES - Add Student </title>

      <meta name="description" content="Add Student to Database" />
      <meta name="keywords" content="JES, Add, Student" />
    </Head>

    <div className="container-fluid marginTB">
      <h1 className="heading"> Add Student to Database </h1>
      <div className="row minHeight">
        
        <div className="col-md-6 d-flex justify-content-center align-items-center marginTB">
          <form method="post" target="_self" encType="application/x-www-form-urlencoded" className="width100"
          autoComplete="off" noValidate onSubmit={ handleSubmit }>

            <Alert message={ message } warn={ warn } />

            <div className="form-floating mb-3 mt-3">
              <input 
                name="name" 
                type="text"
                value={ inputs.name }
                onChange={ handleChange }
                autoFocus
                required
                maxLength={ 50 }
                pattern="^[a-zA-Z].*[\s\.]*$"
                placeholder="Name*" 
                className="form-control textInput" 
              />
              <label htmlFor="name" className="textInput"> Name* </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="father" 
                type="text"
                value={ inputs.father }
                onChange={ handleChange }
                required
                maxLength={ 50 }
                pattern="^[a-zA-Z].*[\s\.]*$"
                placeholder="Father's Name*" 
                className="form-control textInput" 
              />
              <label htmlFor="father" className="textInput"> Father's Name* </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="reg" 
                type="text"
                value={ inputs.reg }
                onChange={ handleChange }
                required
                maxLength={ 50 }
                pattern="[A-Z\d]"
                placeholder="Reg No.*" 
                className="form-control textInput" 
              />
              <label htmlFor="reg" className="textInput"> Reg No.* </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <select name="grade" value={ inputs.grade } onChange={ handleChange } required className="form-select textInput">
                <option value="NULL" disabled className="bold displayNone"> Select The Grade </option>
              {
                grades.map(gradesMapper)
              }
              </select>
              <label htmlFor="grade" className="textInput"> Grade* </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="fees" 
                type="number"
                value={ inputs.fees || "" }
                onChange={ handleChange }
                required
                min={ 0 }
                max={ 99999 }
                pattern="^[0-9]+$"
                placeholder="Fees*" 
                className="form-control textInput" 
              />
              <label htmlFor="fees" className="textInput"> Fees* </label>
            </div>

            <div className="d-flex justify-content-center align-items-center text-center">
              <button onClick={ send } type="button" className="d-flex justify-content-center align-items-center mainBtn"> Submit </button>
            </div>

          </form>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center marginTB">
          <img src="/images/add.webp" alt="Image" loading="eager" draggable="false" className="width75 scaler" />
        </div>

      </div>
    </div>
  </>
  )
}

// Export Add
export default Add ;