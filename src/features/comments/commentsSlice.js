import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchComments } from '../../utilities/api';



export const loadCommentsForPost = createAsyncThunk(
    'comments/fetchComments', 
    async ({loadCommentsArguments}) => {
      const { id, subreddit, titleNoSpaces } = loadCommentsArguments;
      const response = await fetchComments(id, subreddit, titleNoSpaces);
      const json = await response.json();
      const data = {[id] : json.slice(1).map(info => info.data.children.map(commentInfo => commentInfo.data))};
      return data;
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: {},
    showComments: {},
    isLoadingComments: false,
    failedToLoadComments: false
  },
  reducers: {
    toggleShowComments: (state, action) => {
        Object.assign(state.showComments, action.payload);
    }
  },
  extraReducers:  {
    [loadCommentsForPost.pending]: (state) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
    },
    [loadCommentsForPost.fulfilled]: (state, action) => {
        Object.assign(state.comments, action.payload);

        Object.keys(action.payload).forEach(id => state.showComments[id] = true);

        state.isLoadingComments = false;
        state.failedToLoadComments = false;
    },
    [loadCommentsForPost.rejected]: (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
    }
}
});

export const selectComments = (state) => state.comments.comments;
export const selectShowComments = (state) => state.comments.showComments
export const isLoadingComments = (state) => state.comments.isLoadingComments;

export const { toggleShowComments } = commentsSlice.actions;

export default commentsSlice.reducer;
