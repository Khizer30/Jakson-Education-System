import React, { useState, useEffect, useRef } from "react" ;
import Head from "next/head" ;
import { useRouter } from "next/router" ;
import Image from "next/image" ;
import ReCAPTCHA from "react-google-recaptcha" ;
import type { NextRouter } from "next/router" ;
// ...
import { useAuth } from "../components/AuthContext" ;
import { logInObj, postAPI } from "../lib/Library" ;
import type { LogIn, ReCAPTCHAResponse, Res, Error } from "../lib/Library" ;
import img from "../public/images/logo.webp" ;

// Log In
function LogIn(): JSX.Element
{
  // Variables
  const router: NextRouter = useRouter() ;
  const { user, logInUser } = useAuth()! ;
  const recaptchaRef = useRef<ReCAPTCHA | undefined>(undefined) ;
  const [inputs, setInputs] = useState<LogIn>(logInObj) ;
  const [message, setMessage] = useState<string>("") ;
  const [loading, setLoading] = useState<boolean>(false) ;

  // Redirect If Logged In
  useEffect(() =>
  {
    if (user)
    {
      router.replace("/dashboard") ;
    }
  }, []) ;

  // Handle Change
  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((values: LogIn) => ({ ...values, [event.target.name]: event.target.value })) ;
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
            setMessage("*Invalid Input") ;
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
        setMessage("*Input is Too Long") ;
        return false ;
      }
    }
    else
    {
      setMessage("*Please, Complete The Form") ;
      return false ;
    }
  }

  // Verify
  async function verify(): Promise<boolean>
  {
    let token: string | null = await recaptchaRef.current!.executeAsync() ;
    let res: Res = await postAPI("/api/recaptcha", { token: token }) ;

    if (res.code === 100)
    {
      let result: ReCAPTCHAResponse = JSON.parse(res.message) ;

      return result.success ;
    }
    else
    {
      return false ;
    }
  }

  // Send
  async function send(): Promise<void>
  {
    setMessage("") ;

    if (checkInput(inputs.email, 50, "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|info)\\b") &&
    checkInput(inputs.password, 50, "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&=])[A-Za-z\\d@$!%*#?&=]{8,}$"))
    {
      setLoading(true) ;
      setMessage("Verifying...") ;

      let isHuman: boolean = await verify() ;

      if (isHuman)
      {
        logInUser(inputs.email, inputs.password)
        .then(() =>
        {
          router.replace("/dashboard") ;
        })
        .catch((error: Error) =>
        {
          setLoading(false) ;

          recaptchaRef.current!.reset() ;

          if (error.code === "auth/user-not-found")
          {
            setMessage("*Invalid Email") ;
          }
          else if (error.code === "auth/wrong-password")
          {
            setMessage("*Invalid Password") ;
          }
          else if (error.code === "auth/too-many-requests")
          {
            setMessage("*Too Many Attempts") ;
          }
          else
          {
            setMessage(`*${ error.code }`) ;
          }
        }) ;
      }
      else
      {
        setLoading(false) ;
        setMessage("You Are a Bot!") ;

        recaptchaRef.current!.reset() ;
      }
    }
  }

  return (
  <>
    <Head>
      <title> JES | Login </title>

      <meta name="description" content="Login" />
      <meta name="keywords" content="JES, Login" />
    </Head>

    <div className="container-fluid d-flex justify-content-center align-items-center loginContainer">
      <div className="d-flex flex-column justify-content-center align-items-center loginDiv">
        <div className="loginImg scaler">
          <Image
            src={ img }
            alt="Logo"
            layout="intrinsic"
            placeholder="empty"
            priority
            draggable="false"
          />
        </div>

        <div className="width75">
          <form method="post" target="_self" encType="application/x-www-form-urlencoded"
          autoComplete="off" noValidate onSubmit={ handleSubmit }>

            <p className={ loading ? "loginLoading" : "loginError" }> { message || <br /> } </p>

            <input 
              name="email" 
              type="email"
              value={ inputs.email }
              onChange={ handleChange }
              autoFocus
              required
              maxLength={ 50 }
              pattern="^[a-zA-Z].*[\s\.]*$"
              placeholder="Email*" 
              className="form-control loginInput" 
            />

            <input 
              name="password" 
              type="password"
              value={ inputs.password }
              onChange={ handleChange }
              required
              maxLength={ 50 }
              pattern="^[a-zA-Z].*[\s\.]*$"
              placeholder="Password*" 
              className="form-control loginInput" 
            />

            <div className="d-flex justify-content-center align-items-center">
              <button onClick={ send } type="button" className="d-flex justify-content-center align-items-center loginBtn"> Submit </button>
            </div>

            <ReCAPTCHA
              ref={ recaptchaRef }
              sitekey={ process.env.NEXT_PUBLIC_SITE_KEY! }
              size="invisible"
            />
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

// Export Log In
export default LogIn ;