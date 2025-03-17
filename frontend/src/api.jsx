const BASE_URL = "http://localhost:8080/api";

const API_ENDPOINTS = {
    NEWS: `${BASE_URL}/news`, 
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    
    // 📌 Bookmark Endpoints
    ADD_BOOKMARK: `${BASE_URL}/bookmarks/add`,
    GET_BOOKMARKS: `${BASE_URL}/bookmarks/list`,
    REMOVE_BOOKMARK: (id) => `${BASE_URL}/bookmarks/remove/${id}`,
    
    // 📌 Poll Endpoints
    POLLS: `${BASE_URL}/polls`,
    GENERATE_POLL: `${BASE_URL}/polls/generate`,
    VOTE_POLL: `${BASE_URL}/polls/vote`,
};

export default API_ENDPOINTS;
