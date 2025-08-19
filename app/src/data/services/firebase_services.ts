import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User as FirebaseUser,
    Auth,
  } from 'firebase/auth';

  import {IAuthService, AuthChangeCallBack } from '../../domain/interfaces/i_auth_services';
  import { IUser } from '../../domain/types';

  function mapFirebaseUser(u:FirebaseUser| null){
    if (!u) return null;
    return {uid:u.uid, email:u.email?? null}
  }


  export class FirebaseService implements IAuthService{
    constructor(private auth: Auth){}
      async signUp(email: string, password: string): Promise<IUser> {
          const res = await createUserWithEmailAndPassword(this.auth, email, password);
          return mapFirebaseUser(res.user) as IUser;
      }
      async signIn(email: string, password: string): Promise<IUser> {
          const res = await signInWithEmailAndPassword(this.auth, email, password);
          return mapFirebaseUser(res.user) as IUser;
      }
      async logout(): Promise<void>{

          const res =  await firebaseSignOut(this.auth);

      }
      subscribe(cb: AuthChangeCallBack): () => void {
        const unsubscribe = onAuthStateChanged(this.auth, (u) => cb(mapFirebaseUser(u)));
        return unsubscribe;
      }
  }