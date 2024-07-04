import {Configuration} from "@src/codegen";

export const DEBUG = (...args: any[]) => {
  if (import.meta.env.MODE !== "production") {
    console.debug(args)
  }
}

export const ERROR = (...args: any[]) => {
  if (import.meta.env.MODE !== "production") {
    console.error(args)
  }
}

export const headerConfig = (token: string) => {
  const config = new Configuration();
  config.baseOptions = {
    headers: { Authorization: 'Bearer ' + token },
  };
  return config
}
