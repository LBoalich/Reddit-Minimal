import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../../utilities/api";

export const loadPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const response = await fetchPosts();
        const json = await response.json();
        return json;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoadingPosts: false,
        hasError: false
    },    
    extraReducers: {
        [loadPosts.pending]: (state, action) => {
            state.isLoadingPosts = true;
            state.hasError = false;
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.data.children.map(post => post.data);
            state.isLoadingPosts = false;
            state.hasError = false;
        },
        [loadPosts.rejected]: (state, action) => {
            state.isLoadingPosts = false;
            state.hasError = true;
        }
    }
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoading;


export default postsSlice.reducer;
      
        