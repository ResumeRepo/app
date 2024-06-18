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
