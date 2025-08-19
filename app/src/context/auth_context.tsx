import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { IUser } from '../domain/types';
import { IAuthRepository } from '../domain/interfaces/i_auth_repository';

type authStatus = 'idle'|'loading'|'authenticated'|'unauthenticated';

type AuthState = {
    user: IUser| null
    status: authStatus;
    initializing: boolean;
    error?: string| null;
}

type AuthAction = | {type:'Loading'}| {type:'Set_User';payLoad:IUser| null}| {type:'Error';payLoad:string|null}
|{type:'initialize'};

const initialState: AuthState = {
    user:null,
    status:'idle',
    initializing:true,
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
        case 'initialize':
            return {...state,initializing:false}
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



export function AuthProvider({children, repository}:{children:React.ReactNode; repository:IAuthRepository}){
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const unsub = repository.onAuthStateChanged((u) => {
          dispatch({ type: 'Set_User', payLoad: u });
          dispatch({ type: 'initialize' });
        });
        return () => unsub();
      }, [repository]);

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