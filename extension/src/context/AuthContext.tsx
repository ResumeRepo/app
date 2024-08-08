import React, {useEffect, useState} from 'react';
import {SessionUser, UserApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";

import LoginForm from "@src/components/LoginForm";
import CircularLoader from "@src/components/Loader";


type AuthContextProps = {
  authUser?: SessionUser
  setAuthUser?: (user: SessionUser | undefined) => void
}

export const AuthContext: React.Context<AuthContextProps> = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

let initialized = false

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = React.useState<SessionUser | undefined>(undefined);
  const [loading, setLoading] = useState(true)

  const setSessionUser = (jwt: string) => {
    DEBUG("JWT", jwt)
    if (jwt) {
      new UserApi(headerConfig(jwt)).getUserprofile().then(response => {
        const profileResponse: SessionUser = response.data
        DEBUG("Setting session user", profileResponse)
        setAuthUser(profileResponse)
        setLoading(false)
      }).catch(e => {
        ERROR(e)
        setLoading(false)
      })
    } else {
      setAuthUser(undefined)
      setLoading(false)
    }
  }


  useEffect(() => {
    if (!initialized) {
      if (import.meta.env.MODE === "production") {
        chrome.storage.sync.get("nextRoleToken").then(cache => {
          setSessionUser(cache.nextRoleToken)
        })
      } else {
        const item = localStorage.getItem("nextRoleToken")
        if (item) {
          setSessionUser(JSON.parse(item)["nextRoleToken"])
        } else {
          setLoading(false)
        }
      }
      initialized = true
    }
  }, []);

  const componentToLoad = () => {
    if (authUser) {
      return children
    } else {
      if (loading) {
        return <div className="flex items-center justify-center h-screen"><CircularLoader/></div>
      } else {
        return <LoginForm/>
      }
    }
  }

  return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {componentToLoad()}
      </AuthContext.Provider>
  );
};
