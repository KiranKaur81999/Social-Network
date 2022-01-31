import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES, GET_REPOS } from './types';
import axios from 'axios';
import { setAlert } from './alert';


// Get Profile of user
export const getCurrentProfile = ()=> async dispatch=>{
    try{
        const res = await axios.get('/api/profiles/me');
        console.log(res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(err){
        dispatch({ type: CLEAR_PROFILE });
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Get all Profiles
export const getProfiles = ()=> async dispatch=>{
    try{
        dispatch({ type: CLEAR_PROFILE });
        const res = await axios.get('/api/profiles');
        //console.log(res.data);
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Profile by ID
export const getProfileById = userId => async dispatch=>{
   
    try{
        
        const res = await axios.get(`/api/profiles/user/${userId}`);
        console.log(res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Github Repos
export const getGithubRepos = username => async dispatch=>{
    try{
        const res = await axios.get(`/api/profiles/github/${username}`);
        console.log(res.data);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (formData, history, edit=false) => async dispatch =>{
    try{
        /*const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profiles', formData, config);*/
        const sendData = new FormData();
        sendData.append('company', formData.company);
        sendData.append('website', formData.website);
        sendData.append('location', formData.location);
        sendData.append('status', formData.status);
        sendData.append('skills', formData.skills);
        sendData.append('githubusername', formData.githubusername);
        sendData.append('bio', formData.bio);
        sendData.append('image', formData.image);
        
        const res = await axios.post('/api/profiles', sendData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }
        
    }catch(err){
        const errors = err.response.data.errors;
        console.log(errors);
       
        if(errors)
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch =>{

    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profiles/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
        
    }catch(err){
        const errors = err.response.data.errors;
        console.log(errors);
       
        if(errors)
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch =>{
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profiles/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
        
    }catch(err){
        const errors = err.response.data.errors;
        console.log(errors);
       
        if(errors)
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Experience

export const deleteExperience = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profiles/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    
        dispatch(setAlert('Experience Removed', 'success'));


    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Education

export const deleteEducation = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profiles/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    
        dispatch(setAlert('Education Removed', 'success'));


    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Account

export const deleteAccount = () => async dispatch =>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try{
            await axios.delete('/api/profiles');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been permanently deleted'));

        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}