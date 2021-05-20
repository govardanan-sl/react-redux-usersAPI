import {SET_LOGGIN,SET_LOGGOUT} from './actionTypes';

export const setLoggedIn = (payload = null) =>{
    return {
        type:SET_LOGGIN,
        payload
    }
}

export const Loggout = () =>{
    return{
        type:SET_LOGGOUT
    }
}