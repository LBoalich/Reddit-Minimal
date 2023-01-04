import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubreddits } from "../../utilities/api";

export const loadSubreddits = createAsyncThunk(
    "subreddits/fetchSubreddits",
    async ( {firstArg, secondArg }, ThunkAPI) => {
        const data = await fetchSubreddits();
        const json = await data.json();
        return json;
    }
);

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [
            {
                name: "display_name",
                img: "header_img",
                title: "fake title",
                url: "fake url",
            },
            {
                name: "display_name2",
                img: "header_img2",
                title: "fake title 2",
                url: "fake url 2",
            },
        ],
        isLoadingSubreddits: false,
        hasError: false
    },
    extraReducers: {
        [loadSubreddits.pending]: (state, action) => {
            state.isLoadingSubreddits = true;
            state.hasError = false;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.subreddits = action.payload;
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
      
        