import React, {useState} from 'react';
import {useAuthContext} from "@src/context/AuthContext";
import logo from '@assets/img/logo.png';
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";
import {UserApi} from "@src/codegen";

export default function LoginForm() {
  const [otpSent, setOtpSent] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const {setAuthUser} = useAuthContext()

  const onEmailInputChange = (event: any) => {
    event.preventDefault()
    const value = event.target.value
    if (value && value.includes("@")) {
      setEmail(value)
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }


  const getOtpSentMessage = (): string => {
    if (validateEmail(email)) {
      const parts = email.split("@")
      const redacted = `${parts[0].charAt(0)}*****@${parts[1]}`
      return `We have sent an OTP to your email ${redacted}`
    }
    return "We have sent an OTP to your email address."
  }

  const onOtpConfirmation = (event: any) => {
    event.preventDefault()
    setOtpError("")
    const token = event.target.value
    setToken(token)
    if (token) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }

  const validateEmail = (toValidate: string) => {
    return String(toValidate)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onSubmit = async () => {
    setOtpError("")
    console.log("token: ", token, otpSent)
    if (otpSent && token) {
      new UserApi(headerConfig("ignore")).confirmOtp({
        email: email,
        otp: token
      }).then(response => {
        DEBUG(response.data)
        if (setAuthUser) {
          const jwt = response.data.session_user?.token
          if (jwt) {
            const item = {nextRoleToken: jwt}
            if (import.meta.env.MODE === "production") {
              chrome.storage.sync.set(item);
            } else {
              localStorage.setItem("nextRoleToken", JSON.stringify(item))
            }
            setAuthUser(response.data.session_user)
          }
        }
      }).catch(e => ERROR(e));
    } else {
      setOtpSent(false)
      setToken("")
      if (validateEmail(email)) {
        setOtpSent(true)
        new UserApi(headerConfig("ignore")).signIn({
          value: email
        }).then(response => {
          DEBUG(response.data)
        }).catch(e => ERROR(e));
      } else {
        setOtpError("Please enter a valid email address")
      }
    }
  }


  return (
      <div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
          <div className="relative overflow-auto mb-8">
            <div className="flex justify-center">
              <div className="flex items-center text-xl font-semibold text-black">
                <img className="w-8 h-8 mr-2 pb-1"
                     src={logo} alt="NextRole"/>
                NextRole
              </div>
            </div>
          </div>
          <div
              className="relative bg-white px-6 pt-10 pb-9 mx-auto w-full max-w-lg rounded-xl border border-gray-200 ">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  {otpSent ? <p>Email Verification</p> : <p>Sign in with Email</p>}
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  {otpSent ? <p>{getOtpSentMessage()}</p> :
                      <p>We will send a one-time password to your email address</p>}

                </div>
              </div>

              <div>
                <div>
                  <div className="flex flex-col space-y-16">
                    <div
                        className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="w-full">
                        {otpSent ? <>
                          <div className="w-full h-16 mr-2">
                            <input
                                className="w-full h-full flex flex-col items-center justify-center text-center font-extrabold text-lg outline-none rounded-xl border border-gray-200 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                type="text" placeholder="Enter your verification code"
                                onChange={onOtpConfirmation}/>
                          </div>
                        </> : <div className="w-full h-16 ">
                          <input
                              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                              type="text" name="" id="" placeholder="email@domain.com"
                              onChange={onEmailInputChange}/>
                        </div>
                        }
                        <div className="mt-2 text-center h-5">
                          <span className="text-red-500">{otpError ? otpError : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button disabled={buttonDisabled}
                                className="flex flex-row items-center justify-center text-center w-full border outline-none py-5 bg-blue-700 border-none text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={onSubmit}>
                          {otpSent ? <p className="font-extrabold text-lg">Confirm</p> :
                              <p className="font-extrabold text-lg">Continue</p>}
                        </button>
                      </div>

                      <div
                          className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p> <a
                          className="flex flex-row items-center text-blue-600" href="http://"
                          target="_blank" rel="noopener noreferrer">Resend</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
