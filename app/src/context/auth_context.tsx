import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { IUser } from '../domain/types';
import { FirebaseService } from '../data/services/firebase_services';
import { AuthRepository } from '../data/repositories/auth_repository';
import { auth } from '../config/firebase_config';

type authStatus = 'idle'|'loading'|'authenticated'|'unauthenticated';

type AuthState = {
    user: IUser| null
    status: authStatus;
    error?: string| null;
}

type AuthAction = | {type:'Loading'}| {type:'Set_User';payLoad:IUser| null}| {type:'Error';payLoad:string|null}


const initialState: AuthState = {
    user:null,
    status:'idle',
    error:null,
};

function reducer(state:AuthState, action:AuthAction):AuthState{
    switch(action.type){
        case 'Loading':
            return {...state,status:'loading',error:null}
        case 'Set_User':
            return {...state,user:action.payLoad,status:action.payLoad ?'authenticated':'unauthenticated',error:null}
        case 'Error':
            return {...state,error:action.payLoad,status:'unauthenticated'}
        default:
            return state;
    }

}

const AuthStateContext = createContext<AuthState|undefined>(undefined);
const AuthActionsContext =  createContext<{
    register:(email:string,password:string)=>Promise<void>;
    login:(email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
}| undefined>(undefined);



export function AuthProvider({children}:{children:React.ReactNode}){
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Create instances directly without DI
    const firebaseService = new FirebaseService(auth);
    const repository = new AuthRepository(firebaseService);
    
    useEffect(() => {
        const unsub = firebaseService.subscribe((u) => {
          dispatch({ type: 'Set_User', payLoad: u });
         
        });
        return () => unsub();
      }, [firebaseService]);

    const register = useCallback(async (email:string,password:string)=>{
        dispatch({type:'Loading'});
        try{
            await repository.register(email,password);

        }catch(e:any){
           dispatch({type:'Error',payLoad:e?.message?? 'Registration failed'});
        }

    },[repository]);
    
    const login = useCallback(async(email:string,password:string)=>{
        dispatch({type:'Loading'});
        try{
            await repository.login(email,password);

        }catch(e:any){
           dispatch({type:'Error',payLoad:e?.message?? 'Login failed'});
        }
    },[repository]);

    const logout = useCallback(async()=>{
       dispatch({type:'Loading'});
       try {
         await repository.logout();
       } catch (e:any) {
        dispatch({type:'Error',payLoad:e?.message?? 'Logout failed'});
       }
    },[repository]);


    return (
        <AuthStateContext.Provider value = {state}>
            <AuthActionsContext.Provider value={{register,login,logout}}>
                {children}
            </AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    )
}

export function useAuthState() {
    const ctx = useContext(AuthStateContext);
    if(!ctx) throw new Error('useAuthState must be used inside AuthProvider');
    return ctx;
}

export function useAuthAction() {
    const ctx = useContext(AuthActionsContext);
    if(!ctx) throw new Error('useAuthActions must be used inside AuthProvider');
    return ctx;
}
