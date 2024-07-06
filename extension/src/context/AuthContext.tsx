import React, {useEffect, useState} from 'react';
import {SessionUser, UserApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";

import LoginForm from "@src/components/LoginForm";


type AuthContextProps = {
  authUser?: SessionUser
  setAuthUser?: (user: SessionUser | undefined) => void
}

export const AuthContext: React.Context<AuthContextProps> = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = React.useState<SessionUser | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [loaded, setLoaded] = useState(false)

  const setSessionUser = (jwt: string) => {
    DEBUG("JWT", jwt)
    if (jwt) {
      new UserApi(headerConfig(jwt)).getUserprofile().then(response => {
        const profileResponse: SessionUser = response.data
        DEBUG("Setting session user", profileResponse)
        setAuthUser(profileResponse)
      }).catch(e => ERROR(e))
    } else {
      console.log("token not set - AuthContext")
      setAuthUser(undefined)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      if (import.meta.env.MODE === "production") {
        chrome.storage.sync.get("nextRoleToken").then(cache => {
          setSessionUser(cache.nextRoleToken)
        })
      } else {
        const item = localStorage.getItem("nextRoleToken")
        if (item) {
          console.log("calling setSessionUser...")
          setSessionUser(JSON.parse(item)["nextRoleToken"])
        }
      }
    }
  }, []);

  return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {authUser ? children : <LoginForm/>}

        {/*{loading ? <div className="flex items-center justify-center h-screen">*/}
        {/*  <CircularLoader/>*/}
        {/*</div>: children}*/}


      </AuthContext.Provider>
  );
};
