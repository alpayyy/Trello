import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_ENDPOINT = "http://localhost:8080/api";

const initialState = {
    user: {
       
    },
    isAuthenticated: false,
    loading: false,
    error: null
};

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (input, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_ENDPOINT}/users/${input.userName}`
            );
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
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
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
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
