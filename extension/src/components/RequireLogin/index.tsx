import React from 'react';
import {useAuthContext} from "@src/context/AuthContext";
import logo from '@assets/img/logo.png';

export default function RequireLogin({ children,}: {
  children: React.ReactNode;
}) {
  const {authUser} = useAuthContext()

  console.log("authUser: ", authUser)
  if (!authUser) {
    return (
        <div>
          <section >
            <div
                className="flex flex-col items-center justify-center mx-auto md:h-screen">
              <div className="relative h-fit overflow-auto">
                <div className="flex justify-center">
                  <div className="flex items-center mb-6 text-2xl font-semibold text-black">
                    <img className="w-8 h-8 mr-2 pb-1"
                         src={logo} alt="NextRole"/>
                    NextRole
                  </div>
                </div>

                <div className="mt-10 w-full text-center flex flex-col">
                  <a href="http://localhost:3300/signin?p=google" target="_blank">
                  <button
                      type="button"
                      className="text-center inline-flex items-center w-60 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-[#4285F4]/55 me-2 mb-4">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                      <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
                    </svg>
                    Sign in with Google
                  </button>
                  </a>

                  <a href="http://localhost:3300/signin?p=github" target="_blank">
                  <button
                      type="button"
                      className="text-center inline-flex items-center w-60 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-4">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                    </svg>
                    Sign in with Github
                  </button>
                  </a>

                  {/*<button*/}
                  {/*    onClick={() => firebaseSignIn(new GithubAuthProvider())}*/}
                  {/*    type="button"*/}
                  {/*    className="mb-4 text-center inline-flex items-center w-60 bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">*/}
                  {/*  <svg className="w-4 h-4 me-2" viewBox="0 -2 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg"*/}
                  {/*       xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>*/}
                  {/*    <g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-702.000000, -265.000000)" fill="#007EBB"> <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" id="LinkedIn"> </path> </g> </g> </g></svg>*/}
                  {/*  Sign in with LinkedIn*/}
                  {/*</button>*/}

                  {/*<button onClick={() => firebaseSignIn(new GithubAuthProvider())}*/}
                  {/*        className="mx-auto mt-2 flex h-[46px] w-full items-center justify-center space-x-2 rounded-md bg-zinc-900 p-2 text-zinc-500 transition-colors hover:border-gray-400 hover:bg-zinc-800 hover:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500">*/}
                  {/*  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"*/}
                  {/*       className="fill-zinc-300">*/}
                  {/*    <path*/}
                  {/*        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>*/}
                  {/*  </svg>*/}
                  {/*  <span>Sign in with Github</span></button>*/}

                  {/*<button*/}
                  {/*    className="mx-auto mt-2 flex h-[46px] w-full items-center justify-center space-x-2 rounded-md bg-zinc-900 p-2 text-zinc-500 transition-colors hover:border-gray-400 hover:bg-zinc-800 hover:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500">*/}
                  {/*  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"*/}
                  {/*       xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-300">*/}
                  {/*    <path*/}
                  {/*        d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"*/}
                  {/*        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>*/}
                  {/*  </svg>*/}
                  {/*  <span>Sign in with Microsoft</span></button>*/}

                  {/*<button*/}
                  {/*    className="mx-auto mt-2 flex h-[46px] w-full items-center justify-center space-x-2 rounded-md bg-zinc-900 p-2 text-zinc-500 transition-colors hover:border-gray-400 hover:bg-zinc-800 hover:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500">*/}
                  {/*  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"*/}
                  {/*       xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-300">*/}
                  {/*    <path*/}
                  {/*        d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z"*/}
                  {/*        fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>*/}
                  {/*  </svg>*/}
                  {/*  <span>Sign in with Twitter</span></button>*/}

                  {/*<div className="py-8 text-center">*/}
                {/*<span className="text-xs font-light text-zinc-400">*/}
              {/*<a href="/privacy" className="text-primary-700 underline px-1">Privacy Policy</a> and*/}
              {/*<a href="/terms" className="text-primary-700 underline px-1">Terms of Service</a> apply*/}
              {/*  </span>*/}
                  </div>
                {/*</div>*/}
              </div>
            </div>
          </section>
        </div>
    )
  }
  return (
      <>{children}</>
  );
}
