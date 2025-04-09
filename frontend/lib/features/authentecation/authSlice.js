import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const registerUser = createAsyncThunk('auth/registerUser',async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/signup',payload);
            return response.data.createUser;
        } catch (error) {
            return rejectWithValue(error.response.data.createUser);
        }
    }
);

export const loginUser = createAsyncThunk('auth/loginUser',async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/signin', payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
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

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, { getState, rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:8000/allusers', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
        return response.data; // Assuming your backend returns users in a "data" field
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: [],
        users: [],         // Add new state for all users
        token: null,
        loading: false,
        error: null,
    },
    reducers: {},
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
                state.user = action.payload;
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
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Store the list of users
            });
    },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
