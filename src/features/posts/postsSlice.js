import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../../utilities/api";

export const loadPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ( {firstArg, secondArg }, ThunkAPI) => {
        const data = await fetchPosts();
        const json = await data.json();
        return json;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [
            {
                kind: "listing",
                data: {
                    children: [{
                        kind: "link",
                        data: {
                            author: "Author 1",
                            media: "",
                            mediaEmbed: "Media 1",
                            numComments: "Com#1",
                            score: "Score 1",
                            selftextHtml: "HTML Text 1",
                            thumbnail: "",
                            title: "Title 1",
                            name: "",
                        }
                    }]
                }
            },
            {
                kind: "listing2",
                data: {
                    children: [{
                        kind: "link2",
                        data: {
                            author: "Author 2",
                            media: "",
                            mediaEmbed: "Media 2",
                            numComments: "Com#2",
                            score: "Score 2",
                            selftextHtml: "HTML Text 2",
                            thumbnail: "",
                            title: "Title 2",
                            name: "",
                        }
                    }]
                }
            },
        ],
        isLoadingPosts: false,
        hasError: false
    },    
    extraReducers: {
        [loadPosts.pending]: (state, action) => {
            state.isLoadingPosts = true;
            state.hasError = false;
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.posts.posts = action.payload;
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
      
        