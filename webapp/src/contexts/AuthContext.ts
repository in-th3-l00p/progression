import { createContext } from "react";
import {User} from "../api/auth";

export interface IAuthContext {
    user?: User;
}

const AuthContext = createContext<IAuthContext>({});
export default AuthContext;