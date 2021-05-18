import {SET_LOGGOUT,SET_LOGGIN} from './actionTypes';

const initialState = {
    accessToken : null
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_LOGGIN : return{
            ...state,
            accessToken:action.payload.accessToken
        }
        case SET_LOGGOUT: return{
            ...state,
            accessToken:null
        }
        default:return state
    }
}

export default reducer;