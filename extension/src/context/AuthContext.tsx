import React, {useEffect, useState} from 'react';
import {SessionUser, UserApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";

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

  const setSessionUser = (jwt: string) => {
    DEBUG("JWT", jwt)
    if (jwt) {
      new UserApi(headerConfig(jwt)).getUserprofile().then(response => {
        const profileResponse: SessionUser = response.data
        DEBUG("Setting session user", profileResponse)
        setAuthUser(profileResponse)
      }).catch(e => {
        ERROR(e)
      })
    } else {
      new UserApi(headerConfig("ignore")).guestSignIn({})
      .then(response => {
        const newJwt = response.data.session_user?.token
        if (newJwt) {
          const item = {aiResumeAssistantJwt: newJwt}
          if (import.meta.env.MODE === "production") {
            chrome.storage.sync.set(item);
          } else {
            sessionStorage.setItem("aiResumeAssistantJwt", JSON.stringify(item))
          }
          setAuthUser(response.data.session_user)
          DEBUG("JWT generated: ", newJwt)
        }
      }).catch(e => {
        ERROR(e)
        setAuthUser(undefined)
      })
    }
  }

  useEffect(() => {
    if (!initialized) {
      if (import.meta.env.MODE === "production") {
        chrome.storage.sync.get("aiResumeAssistantJwt").then(cache => {
          setSessionUser(cache.aiResumeAssistantJwt)
        })
      } else {
        const item = sessionStorage.getItem("aiResumeAssistantJwt")
        let jwt = undefined
        if (item) {
          jwt = JSON.parse(item)["aiResumeAssistantJwt"]
        }
        setSessionUser(jwt)
      }
      initialized = true
    }
  }, []);

  const componentToLoad = () => {
    if (authUser) {
      return children
    } else {
      return <div className="flex items-center justify-center h-screen"><CircularLoader/></div>
    }
  }

  return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {componentToLoad()}
      </AuthContext.Provider>
  );
};
