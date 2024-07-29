import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchUserCards } from '../KanbanSlice/kanbanSlice'; 

const BASE_ENDPOINT = "http://localhost:8080/api";

const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user: storedUser,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null
};

export const fetchUser = createAsyncThunk(
    'users/login',
    async (input, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(
                `${BASE_ENDPOINT}/users/login`,
                input
            );
            dispatch(fetchUserCards(response.data.id)); 
            return response.data;
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Network error';
            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (input, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_ENDPOINT}/users/register`,
                input
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Network error';
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_ENDPOINT}/users/${storedUser.id}`, userData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Network error';
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
                console.log(action.payload)
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
