import { configureStore } from '@reduxjs/toolkit';
import searchReducer from "../features/search/searchSlice";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    subreddits: subredditsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
