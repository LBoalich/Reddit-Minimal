import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, fetchSubredditPosts, fetchSearchPosts } from "../../utilities/api";

export const loadPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetchPosts();
    const json = await response.json();
    return json;
  }
);

export const loadSubredditPosts = createAsyncThunk(
  "posts/fetchSubredditPosts",
  async (name) => {
    const response = await fetchSubredditPosts(name);
    const json = await response.json();
    return json;
  }
);

export const loadSearchPosts = createAsyncThunk(
  "posts/fetchSearchPosts",
  async (searchNoSpaces) => {
    const response = await fetchSearchPosts(searchNoSpaces);
    const json = await response.json();
    return json;
  }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoadingPosts: false,
        failedToLoadPosts: false
    },    
    extraReducers: (builder) => {
        builder
          .addCase(loadPosts.pending, (state) => {
            state.isLoadingPosts = true;
            state.failedToLoadPosts = false;
          })
          .addCase(loadPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data.children.map(post => post.data);
            state.isLoadingPosts = false;
            state.failedToLoadPosts = false;
          })
          .addCase(loadPosts.rejected, (state) => {
            state.isLoadingPosts = false;
            state.failedToLoadPosts = true;
          })
          .addCase(loadSubredditPosts.pending, (state) => {
            state.isLoadingPosts = true;
            state.failedToLoadPosts = false;
          })
          .addCase(loadSubredditPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data.children.map(post => post.data);
            state.isLoadingPosts = false;
            state.failedToLoadPosts = false;
          })
          .addCase(loadSubredditPosts.rejected, (state) => {
            state.isLoadingPosts = false;
            state.failedToLoadPosts = true;
          })
          .addCase(loadSearchPosts.pending, (state) => {
            state.isLoadingPosts = true;
            state.failedToLoadPosts = false;
          })
          .addCase(loadSearchPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data.children.map(post => post.data);
            state.isLoadingPosts = false;
            state.failedToLoadPosts = false;
          })
          .addCase(loadSearchPosts.rejected, (state) => {
            state.isLoadingPosts = false;
            state.failedToLoadPosts = true;
          })
    }
});

export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoading;


export default postsSlice.reducer;
      
        