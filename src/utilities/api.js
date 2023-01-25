export const fetchPosts = () => {
    return fetch("https://www.reddit.com/r/popular.json");
};

export const fetchSubreddits = () => {
    return fetch("https://www.reddit.com/subreddits.json");
};

export const fetchSubredditPosts = (name) => {
    return fetch(`https://www.reddit.com/r/${name}.json`);
};

export const fetchSearchPosts = (searchNoSpaces) => {
    return fetch(`https://www.reddit.com/search.json?q=${searchNoSpaces}`);
};

export const fetchComments = (id, subreddit, titleNoSpaces) => {
     return fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/${titleNoSpaces}/.json`);
};