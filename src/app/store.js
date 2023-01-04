import { configureStore } from '@reduxjs/toolkit';
import searchReducer from "../features/search/searchSlice";
import subredditsReducer from "../features/subreddits/subredditsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    subreddits: subredditsReducer,
  },
});
