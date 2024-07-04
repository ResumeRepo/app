import React, {useEffect, useState} from 'react';
import {SessionUser, UserApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";

import LoginForm from "@src/components/LoginForm";


type AuthContextProps = {
  authUser?: SessionUser
  setAuthUser?: (user: SessionUser) => void
}

export const AuthContext: React.Context<AuthContextProps> = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = React.useState<SessionUser | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const setSessionUser = (token: String) => {
    DEBUG("Token", token)
    if (token) {
      new UserApi(headerConfig(token as string)).getUserprofile().then(response => {
        const profileResponse: SessionUser = response.data
        setAuthUser(profileResponse)
        DEBUG("Setting session user", profileResponse)
      }).catch(e => ERROR(e))
    } else {
      console.log("token not set - AuthContext")
      setAuthUser(undefined)
    }
    setLoading(false)
  }

  useEffect(() => {
    // let token
    // // todo FOR DEBUGGING ONLY
    // const debugging = false
    // console.log("env vars: ", import.meta.env)
    // if (debugging) {
    //   token = import.meta.env.VITE_DEV_AUTH_TOKEN
    //   console.log("setting session token: ", token)
    //   setSessionUser(token)
    // } else {
    //   if (import.meta.env.MODE === "production") {
    //     chrome.storage.sync.get("nextRoleToken").then(cache => {
    //       setSessionUser(cache.nextRoleToken)
    //     })
    //   } else {
    //     token = import.meta.env.VITE_DEV_AUTH_TOKEN
    //     setSessionUser(token)
    //   }
    // }
  }, []);

  // useEffect(() => {
  //   window.addEventListener("token", (event: Event) => {
  //     const token = (event as CustomEvent).detail.token
  //     if (token) {
  //       chrome.storage.sync.set({nextRoleToken: token});
  //       chrome.runtime.sendMessage({
  //         type: "Token",
  //         token: token
  //       });
  //     }
  //   })
  // }, []);

  console.log("in auth context.....: ", import.meta.env)

  return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {authUser ? children : <LoginForm/>}

        {/*{loading ? <div className="flex items-center justify-center h-screen">*/}
        {/*  <CircularLoader/>*/}
        {/*</div>: children}*/}


      </AuthContext.Provider>
  );
};
