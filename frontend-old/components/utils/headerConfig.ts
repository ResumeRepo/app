import {User} from "firebase/auth";
import {Configuration} from "@/codegen";


export const ANONYMOUS_USER_API_KEY = "nr-TOKEN-NOT-SET"

export const getAuthToken = async (user?: User): Promise<string> => {
    if (!!user) {
        const tokenResult = await user?.getIdTokenResult(false)
        if (tokenResult?.token) {
            return tokenResult?.token as string
        }
    }
    return ANONYMOUS_USER_API_KEY
}

export const headerConfig = (token: string) => {
    const config = new Configuration();
    config.baseOptions = {
        headers: { Authorization: 'Bearer ' + token },
    };
    return config
}
