import { useState } from "react" ;
import Head from "next/head" ;
import Image from "next/image" ;
import type React from "react" ;
// ...
import { db } from "../config/firebase" ;
// ...
import { studentObj2, grades, mapper, postAPI } from "../lib/Library" ;
import Alert from "../components/Alert" ;
import { Name, Father, Reg, Fees, Arrears } from "../components/Disabled" ;
import type { Student, DocData, Props, Res } from "../lib/Library" ;
import img from "../public/images/edit.webp" ;

// SSR
export async function getServerSideProps()
{
  let data: object = {} ;
  let gradesCollection = await db.collection("JES").doc("Student Record").listCollections() ;

  for (let i: number = 0; i < gradesCollection.length; i++)
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

// Edit
function Edit(props: Props): JSX.Element
{
  // Variables
  const [data, setData] = useState<object>(JSON.parse(props.data)) ;
  const [inputs, setInputs] = useState<Student>(studentObj2) ;
  const [students, setStudents] = useState<string[] | undefined>(undefined) ;
  const [message, setMessage] = useState<string>("") ;
  const [warn, setWarn] = useState<boolean>(true) ;

  // Handle Change
  async function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): Promise<void>
  {
    let name: string = event.target.name ;
    let value: string = event.target.value ;

    // Capitalize
    if ((name === "father") || (name === "reg"))
    {
      value = value.toUpperCase() ;
    }

    // Set Inputs
    setInputs((values: Student) => ({ ...values, [name]: value })) ;

    // Set Grade
    if (name === "grade")
    {
      setInputs((values: Student) => ({ ...values, "name": "NULL", "father": "", "reg": "", "fees": 0, "arrears": 0 })) ;
      setStudents(data[value]) ;
    }

    // Set Student
    if (name === "name")
    {
      let res: Res = await postAPI("/api/student/get", { grade: inputs.grade, name: value }) ;
      
      if (res.code === 100)
      {
        let studentData: DocData = JSON.parse(res.message) ;

        setInputs((values: Student) => ({ ...values, "father": studentData.father, "reg": studentData.reg, "fees": studentData.fees, "arrears": studentData.arrears })) ;
      }
      else
      {
        setMessage("Error Fetching Student!") ;
        setWarn(true) ;
      }
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

  // Check Number
  function checkNumber(it: number): boolean
  {
    if ((it >= 0) && (it <= 99999))
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

  // Send
  async function send(): Promise<void>
  {
    setMessage("") ;

    if (checkInput(inputs.grade, 50) &&
    checkInput(inputs.name, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.reg, 50) &&
    checkNumber(inputs.fees) &&
    checkNumber(inputs.arrears))
    {
      let res: Res = await postAPI("/api/student/update", inputs) ;

      if (res.code === 100)
      {
        setWarn(false) ;
      }
      else
      {
        setWarn(true) ;
      }

      setInputs(studentObj2) ;
      setStudents(undefined) ;
      setMessage(res.message) ;
    }
  }

  // Change Students Data
  function changeData(): void
  {
    let newData: object = {} ;

    // Remove Student
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

    // Add Student
    tempArr = data[inputs.newClass] ;

    tempArr.push(inputs.name) ;
    tempArr.sort() ;

    newData = { ...data, [inputs.newClass!]: tempArr } ;

    setData(newData) ;
  }

  // Promote
  async function promote(next: boolean): Promise<void>
  {
    setMessage("") ;

    if (checkInput(inputs.grade, 50) &&
    checkInput(inputs.name, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.reg, 50) &&
    checkNumber(inputs.fees) &&
    checkNumber(inputs.arrears))
    {
      let index: number = grades.indexOf(inputs.grade) ;

      if (next)
      {
        if (index < 8)
        {
          inputs.newClass = grades[index + 1] ;
          let res: Res = await postAPI("/api/student/promote", inputs) ;

          if (res.code === 100)
          {
            setWarn(false) ;

            changeData() ;
          }
          else
          {
            setWarn(true) ;
          }
  
          setInputs(studentObj2) ;
          setStudents(undefined) ;
          setMessage(res.message) ;
        }
        else
        {
          setWarn(true) ;
          setMessage("Class VII Not Available!") ;
        }
      }
      else
      {
        if (index > 0)
        {
          inputs.newClass = grades[index - 1] ;
          let res: Res = await postAPI("/api/student/promote", inputs) ;

          if (res.code === 100)
          {
            setWarn(false) ;

            changeData() ;
          }
          else
          {
            setWarn(true) ;
          }
  
          setInputs(studentObj2) ;
          setStudents(undefined) ;
          setMessage(res.message) ;
        }
        else
        {
          setWarn(true) ;
          setMessage("Day Care Not Available!") ;
        }
      }
    }
  }

  return (
  <>
    <Head>
      <title> JES | Edit Student </title>

      <meta name="description" content="Edit Student" />
      <meta name="keywords" content="JES, Edit, Student" />
    </Head>

    <div className="container-fluid mainMargin">
      <h1 className="heading"> Edit Student </h1>
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
            <Name />
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

          { (inputs.name === "NULL") &&
          <>
            <Father />
            <Reg />
            <Fees />
            <Arrears />
          </>
          }

          { (inputs.name !== "NULL") &&
          <>
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
                placeholder="Reg No.*" 
                className="form-control textInput" 
              />
              <label htmlFor="reg" className="textInput"> Reg No.* </label>
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

            <div className="form-floating mb-3 mt-3">
              <input 
                name="arrears" 
                type="number"
                value={ inputs.arrears || "" }
                onChange={ handleChange }
                required
                min={ 0 }
                max={ 99999 }
                pattern="^[0-9]+$"
                placeholder="Arrears*" 
                className="form-control textInput" 
              />
              <label htmlFor="arrears" className="textInput"> Arrears* </label>
            </div>
          </>
          }

            <div className="d-flex justify-content-evenly align-items-center text-center">
              <button onClick={ () => promote(true) } type="button" className="d-flex justify-content-center align-items-center minorBtn"> Promote </button>
              <button onClick={ send } type="button" className="d-flex justify-content-center align-items-center mainBtn"> Submit </button>
              <button onClick={ () => promote(false) } type="button" className="d-flex justify-content-center align-items-center minorBtn"> Demote </button>
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

// Export Edit
export default Edit ;