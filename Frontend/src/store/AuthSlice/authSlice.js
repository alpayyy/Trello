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
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data.error : 'Network error');
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
            return rejectWithValue(error.response ? error.response.data.error : 'Network error');
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
                console.log("User login successful: ", action.payload);
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
                console.log("User login failed: ", action.payload);
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
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
