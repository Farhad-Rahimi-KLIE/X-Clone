import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks

export const addPost = createAsyncThunk("posts/addPost", async ()=>{
    const result = await axios.post("http://localhost:8000/getall");
    return result.data.addpost;
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('http://localhost:8000/getall');
    return response.data.get;
});


export const likePost = createAsyncThunk('posts/likePost', async (payload, thunkAPI) => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }
    const response = await axios.post(`http://localhost:8000/${payload}/like`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token here
          },
        });
    return response.data;
});


export const unlikePost = createAsyncThunk('posts/unlikePost', async (payload) => {
    const response = await axios.post(`http://localhost:8000/${payload}/unlike`);
    return { postId, likes: response.data.likes };
});

export const commentPost = createAsyncThunk('posts/commentPost', async ( payload, thunkAPI ) => {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }
    
    const response = await axios.post(`http://localhost:8000/${payload.postId}/comment`, { text: payload.text },
        {
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token here
            },
        });
        return response.data;
});

export const savePost = createAsyncThunk("posts/savePost", async (payload, thunkAPI) => {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }

    const response = await axios.post(`http://localhost:8000/save/${payload}`,{},
        {
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token here
            },
        }
    );
    return response.data;
  });
  
  export const unsavePost = createAsyncThunk("posts/unsavePost", async (payload, thunkAPI) => {
    const response = await axios.post(`http://localhost:8000/unsave/${payload}`);
    return {postId, unsave: response.data.unsave};
  });
  
  export const fetchSavedPosts = createAsyncThunk("posts/fetchSavedPosts", async () => {
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
    }

    const response = await axios.get(`http://localhost:8000/saved`,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token here
            },
        }
    );
    return response.data;
  });

// Slice
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        savedPosts: [],
        loading: false,
        error: null
      },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post) => post._id === action.payload._id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            }).addCase(commentPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post) => post._id === action.payload._id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            }).addCase(savePost.fulfilled, (state, action) => {
                const index = state.savedPosts.findIndex((post) => post._id === action.payload._id);
                if (index !== -1) {
                    state.savedPosts[index] = action.payload;
                }
              })
              .addCase(unsavePost.fulfilled, (state, action) => {
                state.savedPosts = state.savedPosts.filter((id) => id !== action.payload);
              })
              .addCase(fetchSavedPosts.fulfilled, (state, action) => {
                state.savedPosts = action.payload;
              });
    },
});
export default postsSlice.reducer;