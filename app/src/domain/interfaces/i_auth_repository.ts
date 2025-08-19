import { IUser } from "../types";

export interface IAuthRepository {
    register(email:string, password:string):Promise<IUser>;
    login(email:string, password:string):Promise<IUser>;
    logout():Promise<void>;
    onAuthStateChanged(cb: (u: IUser | null) => void): () => void;
}