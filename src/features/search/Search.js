import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchTerm,
  selectSearchTerm,
  setSearchTerm,
} from "./searchSlice";
import { loadSearchPosts } from "../posts/postsSlice";
import { toggleShowSubreddits } from "../subreddits/subredditsSlice";

const searchIconUrl = require("./searchIcon.png");
const clearIconUrl = require("../../components/Comments/closeButton2.png");

const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const searchNoSpaces = searchTerm.replaceAll(" ", "+");

  const onSearchChangeHandler = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    dispatch(toggleShowSubreddits(false));
    dispatch(setSearchTerm(e.target.value));
    dispatch(loadSearchPosts(searchNoSpaces));
  };

  const onSearchTermClearHandler = () => {
    dispatch(clearSearchTerm());
  };

  return (
    <div id="search-container">
      <img id="search-icon" alt="search icon" src={searchIconUrl} />
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={onSearchChangeHandler}
        placeholder="Search"
      />
      {(searchTerm.length > 0) && (
        <button
          onClick={onSearchTermClearHandler}
          type="button"
          id="search-clear-button"
        >
          <img src={clearIconUrl} alt="clear search button" className="clear-search-img"/>
        </button>
      )}
    </div>
  );
};

export default Search;
