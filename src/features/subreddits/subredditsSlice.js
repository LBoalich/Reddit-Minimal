import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubreddits } from "../../utilities/api";

export const loadSubreddits = createAsyncThunk(
    "subreddits/fetchSubreddits",
    async () => {
        const response = await fetchSubreddits();
        const json = await response.json();
        return json;
    }
);

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoadingSubreddits: false,
        failedToLoadSubreddits: false
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadSubreddits.pending, (state) => {
            state.isLoadingSubreddits = true;
            state.failedToLoadSubreddits = false;
          })
          .addCase(loadSubreddits.fulfilled, (state, action) => {
            state.subreddits = action.payload.data.children.map(subreddit => subreddit.data);
            state.isLoadingSubreddits = false;
            state.failedToLoadSubreddits = false;
          })
          .addCase(loadSubreddits.rejected, (state) => {
            state.isLoadingSubreddits = false;
            state.failedToLoadSubreddits = true;
          })
    }
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) => state.subreddits.isLoadingSubreddits;
export const failedToLoadSubreddits = (state) => state.subreddits.failedToLoadSubreddits;

export default subredditsSlice.reducer;
      
        