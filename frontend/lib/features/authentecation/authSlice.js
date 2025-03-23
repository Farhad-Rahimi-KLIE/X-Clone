import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const registerUser = createAsyncThunk('auth/registerUser',async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/register',payload);
            return response.data.createUser;
        } catch (error) {
            return rejectWithValue(error.response.data.createUser);
        }
    }
);

export const loginUser = createAsyncThunk('auth/loginUser',async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/login', payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);
              }
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.user);
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser',async (_, { getState, rejectWithValue }) => {
        const { token } = getState().auth;
        try {
        await axios.post(
                'http://localhost:8000/logout',
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return true;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
