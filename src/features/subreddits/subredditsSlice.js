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
        hasError: false
    },
    extraReducers: {
        [loadSubreddits.pending]: (state, action) => {
            state.isLoadingSubreddits = true;
            state.hasError = false;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.subreddits = action.payload.data.children.map(subreddit => subreddit.data);
            state.isLoadingSubreddits = false;
            state.hasError = false;
        },
        [loadSubreddits.rejected]: (state, action) => {
            state.isLoadingSubreddits = false;
            state.hasError = true;
        }
    }
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) => state.subreddits.isLoadingSubreddits;

export default subredditsSlice.reducer;
      
        