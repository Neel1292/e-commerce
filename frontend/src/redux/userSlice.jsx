import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getUser from '../utils/getUser';
import getToken from '../utils/getToken';
import { toast } from 'react-toastify';

const user = {
    user: [],
    allusers: [],
    oneUser: [],
    token: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: user,
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.status = 'success';
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },  
        logoutUser: (state) => {
            state.status ='idel';
            state.user = null;
            state.token = null;
            localStorage.clear();
            toast.success('Logout Success');
        },
        getAllUsers: (state, action) => {
            state.allusers = action.payload;
        },
        newUser: (state, action) => {
            state.status = 'succeeded';
            state.user.push(action.payload.user);
        },
        createUser: (state, action) => {
            state.status = 'succeeded';
            console.log(state.status);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUser: (state, action) => {
            state.status = 'succeeded';

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            
            state.user.push(action.payload.user);
            state.token = action.payload.token;
        },
        updateSuccess: (state, action) => {
            let newUser = action.payload;
            
            const user = getUser();
            let updatedUser = {
                ...user,
                ...newUser, 
            }
            
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(updatedUser));
            state.user = updatedUser;
        },
        updateFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        deleteUser: (state, action) => {
            let id = action.payload;
            state.allusers.splice(state.allusers.findIndex(user => user.id === id), 1);
        },
        getSelectedUser: (state, action) => {
            let id = action.payload;
            let index = state.allusers.findIndex(user => user.id === id);
            state.oneUser = state.allusers[index];
        },
        updateSelectedUser: (state, action) => {
            let { id, user } = action.payload;
            let index = state.allusers.findIndex(user => user.id === id);
            state.allusers[index] = user;
        },
        clearOneUser: (state) => {
            state.oneUser = [];
        },   
    }
})

// Update From Own Profile

export const updateUserAsync = (id, user, token) => async dispatch => {
    try {
        
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/edit/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const { user } = response.data;
            dispatch(updateSuccess(user));

        } else {
            dispatch(updateFailure('Login failed'));
        }
    } catch (error) {
        dispatch(updateFailure(error.response?.data?.error || 'Error during login'));
    }
};

export const loginUserAsync = (user) => async dispatch => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/login`, user);
        if (response.status === 200) {
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(loginSuccess({user, token}));
            toast.success('Login Successfully');
        } 
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.error || 'Error during login'));
    }
};

export const createUserAsync = (user) => async dispatch => {
    try {    
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/signup`, user);
        if (response.status === 200) {
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(createUser({ token, user }));
        } else {
            dispatch(loginFailure('Login failed'));
        }
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.error || 'Error during login'));
    }
};

export const createOneUserAsync = (user) => async dispatch => {
    try {
        let token = getToken();
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/add`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const { user } = response.data;
            dispatch(newUser(user));
        }
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.error || 'Error during login'));
    }
};

export const getUsersAsync = () => async dispatch => {
    
    try {   
        let token = getToken();
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const user = response.data;
            dispatch(getAllUsers(user));
        } else {
            dispatch(loginFailure('Login failed'));
            toast.error('Login Failed');
        }
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.error || 'Error during login'));
    }
};

export const updateOneUserAsync = (id, user) => async(dispatch) => {
    try{
        const token = getToken();
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/edit/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if(response.status === 200) {
            dispatch(updateSelectedUser(id, response.data));
        }
    } catch (error) {
        console.error('Error updating item:', error);
    }
}

export const deleteOneUserAsync = (id) => async(dispatch) => {
        
    try{
        const token = getToken();
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL_PRODUCTION}/user/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(response.status === 200) {
            dispatch(deleteUser(response.data.id));
            toast.success('User deleted successfully');
        }
    } catch (error) {
        console.error('Error deleteing item:', error);
    }
}

export const { loginStart, loginSuccess, loginFailure, logoutUser } = userSlice.actions;
export const { getAllUsers } = userSlice.actions;
export const { newUser } = userSlice.actions;
export const { getSelectedUser, updateSelectedUser, clearOneUser } = userSlice.actions;
export const { createUser } = userSlice.actions;
export const { updateUser, updateSuccess, updateFailure } = userSlice.actions;
export const { deleteUser } = userSlice.actions;

export default userSlice.reducer;