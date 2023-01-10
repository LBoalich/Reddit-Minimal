export const fetchPosts = () => {

};

export const fetchSubreddits = () => {
    return fetch("https://www.reddit.com/subreddits.json");
};

export const fetchComments = (postId) => {

};