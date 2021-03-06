import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    Loading: true,
    error: {}
}

export default function foo(state=initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_POSTS:
            return{
                ...state,
                posts: payload,
                Loading: false
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                Loading: false
            }
        case ADD_POST:
            return{
                ...state,
                posts: [payload, ...state.posts],
                Loading: false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                Loading: false
            }
        case POST_ERROR:
            return{
                ...state,
                error: payload,
                Loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes} : post),
                Loading: false
            }
        case ADD_COMMENT:
            return{
                ...state,
                post: {...state.post, comments: payload},
                Loading: false
            }
        case REMOVE_COMMENT:
            return{
                ...state,
                post: {   
                    ...state.post,
                    comments: state.post.comments.filter(comment=> comment._id !== payload)
                },
                Loading: false
            }
        default:
            return state;
    }
};