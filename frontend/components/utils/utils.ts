export const DEBUG = (...args: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.debug(args)
  }
}

export const ERROR = (...args: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(args)
  }
}
