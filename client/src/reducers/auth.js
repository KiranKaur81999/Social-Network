import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    Loading: true,
    user: null
}

export default function foo(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case USER_LOADED: 
        return {
            ...state,
            isAuthenticated: true,
            Loading: false,
            user: payload
        };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: {
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                Loading: false
            };
        }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED: {
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                Loading: false
            };
        }

        default: 
            return state;
    }
};