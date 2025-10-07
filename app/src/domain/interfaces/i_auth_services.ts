import { IUser } from "../types";
export type AuthChangeCallBack = (user:IUser| null) => void;
export interface IAuthService {
    signUp(email:string,password:string):Promise<IUser>;
    signIn(email:string,password:string):Promise<IUser>;
    logout():Promise<void>;
    subscribe(cb: AuthChangeCallBack): () => void;
}
