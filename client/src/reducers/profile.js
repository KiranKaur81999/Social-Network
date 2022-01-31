import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS }  from '../actions/types';


const initialState = {
    profile: null,
    profiles: [],
    Loading: true,
    repos: [],
    error: {}
};

export default function foo(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                Loading: false
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                Loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                Loading: false
            }
        case CLEAR_PROFILE: 
            return{
                ...state,
                profile: null,
                repos: [],
                Loading: false
            }
        case GET_REPOS:
            return{
                ...state,
                repos: payload,
                Loading: false
            }
        default: return state;
    }
}