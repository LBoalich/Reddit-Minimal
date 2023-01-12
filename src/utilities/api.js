export const fetchPosts = () => {
    return fetch("https://www.reddit.com/r/popular.json");
};

export const fetchSubreddits = () => {
    return fetch("https://www.reddit.com/subreddits.json");
};

export const fetchComments = (postId) => {

};