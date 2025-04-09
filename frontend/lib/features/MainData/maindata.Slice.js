// src/redux/slices/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for your API (adjust as per your backend setup)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

// Async Thunks for API calls
export const createPost = createAsyncThunk('posts/createPost',async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, payload , {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'maindata/getUserProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${payload}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all_Post`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data.posts; // Assuming your API returns { message, posts }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/posts/${id}`, { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { id }; // Return post ID to remove from state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}/dislike`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentPost = createAsyncThunk(
  'posts/commentPost',
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/posts/${id}/comment`, { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bookmark Post
export const bookmarkPost = createAsyncThunk(
  'posts/bookmarkPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/posts/${id}/bookmark`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { postId: id, bookmark: response.data.data }; // Return postId and bookmark data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unbookmark Post
export const unbookmarkPost = createAsyncThunk(
  'posts/unbookmarkPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}/unbookmark`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { postId: id }; // Return postId to remove from bookmarks
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Follow User
export const followUser = createAsyncThunk(
  'posts/followUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/${id}/follow`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { userId: id, follow: response.data.data }; // Return userId and follow data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unfollow User
export const unfollowUser = createAsyncThunk(
  'posts/unfollowUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}/unfollow`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return { userId: id }; // Return userId to remove from following
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Post Slice
const maindataSlice  = createSlice({
  name: 'maindata',
  initialState: {
    posts: [],
    singlePost: null,
    bookmarks: [], // Array to store bookmarked post IDs or bookmark objects
    following: [], // Array to store followed user IDs or follow objects
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload.AddPost);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

     // Get User Profile
     builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.profile = null; // Reset profile while fetching
      state.error = null; // Clear previous errors
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload; // { user: {...}, posts: [...] }
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch profile";
    });

    // Get Single Post
    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePost = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    // Get All Posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    // Edit Post
    builder.addCase(editPost.fulfilled, (state, action) => {
      const index = state.posts.findIndex(post => post._id === action.payload.post._id);
      if (index !== -1) state.posts[index] = action.payload.post;
      if (state.singlePost?._id === action.payload.post._id) state.singlePost = action.payload.post;
    });

    // Delete Post
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload.id);
      if (state.singlePost?._id === action.payload.id) state.singlePost = null;
      state.bookmarks = state.bookmarks.filter(b => b.post !== action.payload.id);
    });

    // Like Post
    builder.addCase(likePost.fulfilled, (state, action) => {
      const post = state.posts.find(p => p._id === action.payload.data.post);
      if (post) post.likes.push(action.payload.data.author);
      if (state.singlePost?._id === action.payload.data.post) state.singlePost.likes.push(action.payload.data.author);
    });

    // Unlike Post
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      const post = state.posts.find(p => p._id === action.payload.id);
      const userId = action.payload.userId || localStorage.getItem('userId'); // Adjust based on your auth setup
      if (post) post.likes = post.likes.filter(id => id !== userId);
      if (state.singlePost?._id === action.payload.id) state.singlePost.likes = state.singlePost.likes.filter(id => id !== userId);
    });

    // Comment Post
    builder.addCase(commentPost.fulfilled, (state, action) => {
      if (state.singlePost?._id === action.payload.data.post) {
        state.singlePost.comments = state.singlePost.comments || [];
        state.singlePost.comments.push(action.payload.data);
      }
    });

    // Bookmark Post
    builder.addCase(bookmarkPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(bookmarkPost.fulfilled, (state, action) => {
      state.loading = false;
      state.bookmarks.push(action.payload.bookmark); // Store the full bookmark object
    });
    builder.addCase(bookmarkPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Unbookmark Post
    builder.addCase(unbookmarkPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unbookmarkPost.fulfilled, (state, action) => {
      state.loading = false;
      state.bookmarks = state.bookmarks.filter(b => b.post !== action.payload.postId);
    });
    builder.addCase(unbookmarkPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Follow User
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.following.push(action.payload.follow); // Store the full follow object
      const post = state.posts.find(p => p.author === action.payload.userId);
      if (post) post.author.followers.push(action.payload.follow.fromUser);
      if (state.singlePost?.author === action.payload.userId) state.singlePost.author.followers.push(action.payload.follow.fromUser);
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // Unfollow User
    builder.addCase(unfollowUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      state.loading = false;
      state.following = state.following.filter(f => f.toUser !== action.payload.userId);
      const post = state.posts.find(p => p.author === action.payload.userId);
      const userId = action.payload.followerId || localStorage.getItem('userId'); // Adjust based on your auth setup
      if (post) post.author.followers = post.author.followers.filter(id => id !== userId);
      if (state.singlePost?.author === action.payload.userId) state.singlePost.author.followers = state.singlePost.author.followers.filter(id => id !== userId);
    });
    builder.addCase(unfollowUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

// export const { clearError } = postSlice.actions;
export default maindataSlice.reducer;