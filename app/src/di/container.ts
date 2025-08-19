import { auth } from '../config/firebase_config';

import { FirebaseService } from "../data/services/firebase_services";
import { AuthRepository } from "../data/repositories/auth_repository";

const firebaseService =  new FirebaseService(auth);
const authRepository = new AuthRepository(firebaseService);

export const container = {
    authRepository,
};