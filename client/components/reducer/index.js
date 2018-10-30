import {
    UPVOTE,
    DOWNVOTE,
    ADD_POST,
    ADD_COMMENT,
    ADD_COMMENT_ASYNC,
    ADD_POST_ASYNC,
    UPVOTE_ASYNC,
    DOWNVOTE_ASYNC,
    GET_ALL_POSTS_ASYNC,
    SET_POST_ID
} from '../constants';

import { combinerReducers, combineReducers } from 'redux';

const initialState = {
    posts: [],
    postID: '0'
}

const rootReducer = (state = initialState, action) => {
    let index;
    let updatedState;

    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: [action.newComment, ...state.comments]
            }
        case UPVOTE:
            index = state.comments.findIndex(x => x.id === action.id)

            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, index),
                    {
                        ...state.comments[index],
                        upvotes: state.comments[index].upvotes + 1
                    },
                    ...state.comments.slice(index + 1)
                ]
            }
        case DOWNVOTE:
            index = state.comments.findIndex(x => x.id === action.id)

            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, index),
                    {
                        ...state.comments[index],
                        downvotes: state.comments[index].downvotes + 1
                    },
                    ...state.comments.slice(index + 1)
                ]
            }
        case ADD_POST:
            return [...state, action.newPost];
        default:
            return state;
    }
}

const dbReducer = (state = initialState, action) => {
    let postID;
    let postIndex;

    switch (action.type) {
        case GET_ALL_POSTS_ASYNC:
            let allPosts = action.payload.map(x => x.hasOwnProperty('0') ? x["0"] : x)
            return {
                ...state,
                posts: allPosts
            }

        /**
         * UPVOTE_ASYNC
         * DOWNVOTE_ASYNC
         * ADD_COMMENT_ASYNC
         *
         * Each of these get an entire post object back upon making an axios call,
         * we can do the same reducer operation by just replacing the post that was edited
         */
        case UPVOTE_ASYNC:
        case DOWNVOTE_ASYNC:
        case ADD_COMMENT_ASYNC:
            console.log("PAYLOAD:", action.payload)

            postID = action.payload.id;
            postIndex = state.posts.findIndex(x => x.id === postID);

            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, postIndex),
                    action.payload,
                    ...state.posts.slice(postIndex + 1)
                ]
            }

        case ADD_POST_ASYNC:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.payload
                ]
            }
        case SET_POST_ID:
            return {
                ...state,
                postID: action.postID
            }
        default:
            return state;
    }
}


export default combineReducers({
    original: rootReducer,
    db: dbReducer
});