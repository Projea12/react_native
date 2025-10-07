import { IAuthRepository } from "../../domain/interfaces/i_auth_repository";
import { IUser } from "../../domain/types";
import { IAuthService } from "../../domain/interfaces/i_auth_services";

export class AuthRepository implements IAuthRepository {
    constructor (private authService: IAuthService) {}
    async register(email: string, password: string): Promise<IUser> {
        return this.authService.signUp(email,password);
    }
    async login(email: string, password: string): Promise<IUser> {
        return this.authService.signIn(email,password);
    }
    async logout(): Promise<void> {
        return this.authService.logout();
    }
    onAuthStateChanged(cb: (u: IUser | null) => void): () => void {
        return this.authService.subscribe(cb);
    }
    
}
