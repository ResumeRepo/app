import {Configuration} from "@src/codegen";

export const DEBUG = (...args: any[]) => {
  if (import.meta.env.MODE === "development") {
    console.debug("DEBUG: ", JSON.stringify(args))
  }
}

export const ERROR = (...args: any[]) => {
  if (import.meta.env.MODE === "development") {
    console.error("ERROR: ", JSON.stringify(args))
  }
}

export const headerConfig = (token: string) => {
  const config = new Configuration();
  config.baseOptions = {
    headers: { Authorization: 'Bearer ' + token },
  };
  return config
}
