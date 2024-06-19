import React, {useEffect} from 'react';
import { headerConfig} from "@src/utils/headerConfig";
import {SessionUser, UserApi} from "@src/codegn";
import {ERROR} from "@src/utils/utils";

interface AuthContextProps {
  authUser?: SessionUser
}

export const AuthContext: React.Context<AuthContextProps> = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = React.useState<SessionUser | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const setSessionUser = (token: String) => {
    console.log("in setSessionUser: ", token)
    if (token) {
      console.log("calling get profile:... ")
      new UserApi(headerConfig(token as string)).getUserprofile().then(response => {
        const profileResponse: SessionUser = response.data
        setAuthUser(profileResponse)
        console.log("extension has obtained session user profile: ", profileResponse)
      }).catch(e => ERROR(e))
    } else {
      setAuthUser(undefined)
    }
    setLoading(false)
  }

  useEffect(() => {
    let token
    if (import.meta.env.MODE === "production") {
      chrome.storage.sync.get("nextRoleToken").then(cache => {
        console.log("cache: ", cache)
        console.log("cache.nextRoleToken: ", cache.nextRoleToken)
        setSessionUser(cache.nextRoleToken)
      })
    } else {
      // console.log("import.meta.env: ", import.meta.env)
      // token = import.meta.env.DEV_AUTH_TOKEN
      token = "nreyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTg3NTg5OTgsInN1YiI6IkRvMU1xakdITjFXN2lacGJpVnVvMjd0RXlldDEiLCJleHAiOjkyMjMzNzIwMzY4NTQ3NzV9.eeSm3wBYfj-7AVJxyk3gYFigVe6eorXJiSRxsuRND-mzPoohGmuXW-38zBGksQsBDyP_SUiVzFzU9tX75Oya5Q"
      setSessionUser(token)
    }


    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     const token = await getAuthToken(user)
    //     setAuthUser(user);
    //     new UserApi(headerConfig(token)).getUserprofile().then(response => {
    //       const profileResponse: SessionUser = response.data
    //       console.log("user profile: ", profileResponse)
    //       setNrUser(profileResponse)
    //     }).catch(e => ERROR(e))
    //
    //     new UserApi(headerConfig(token)).exchangeToken().then(response => {
    //       const profileResponse: SessionUser = response.data
    //       console.log("exchange token response: ", profileResponse)
    //
    //
    //       new UserApi(headerConfig(profileResponse.token as string)).getUserprofile().then(response => {
    //         const profileResponse: SessionUser = response.data
    //         console.log("user profile with exchanged token: ", profileResponse)
    //         setNrUser(profileResponse)
    //       }).catch(e => ERROR(e))
    //
    //     }).catch(e => ERROR(e))
    //
    //
    //   } else {
    //     setAuthUser(undefined);
    //     setNrUser(undefined)
    //   }
    //   setLoading(false);
    // });

    // return () => unsubscribe();
  }, []);

  return (
      <AuthContext.Provider value={{ authUser }}>
        {loading ? <div className="flex items-center justify-center h-screen">
          <div role="status">
            <svg aria-hidden="true"
                 className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
              <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>: children}
      </AuthContext.Provider>
  );
};
