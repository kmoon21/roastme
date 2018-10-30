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

import uuid from 'uuid';
import axios from 'axios';

export const upvotePost = postId => ({ type: UPVOTE, id: postId })
export const downvotePost = postId => ({ type: DOWNVOTE, id: postId })

export const addPost = post => ({
    type: ADD_POST,
    newPost: { ...post, time: new Date().toString(), id: '' + id++, upvotes: 0, downvote: 0 }
})

let id = 7;

export const addComment = comment => ({
    type: ADD_COMMENT,
    newComment: {
        id: `${id++}`,
        comment: comment,
        upvotes: 0,
        downvotes: 0
    }
})


const config = {
    headers: {
        "Content-Type": "application/json"
    }
}


export const addPostAsync = (url, caption) => dispatch => {

    let body = {
        id: uuid.v4(),
        url: url,
        caption: caption,
        comments: []
    }
    axios.post('http://192.168.7.230:3000/posts', body, config)
        .then(res => {
            console.log("JSON BODY:", JSON.stringify(body))
            // res.data is the entire post object (comments, url, id, caption)
            dispatch({ type: ADD_POST_ASYNC, payload: res.data })
        })
}

export const addCommentAsync = (comment, post) => dispatch => {

    let body = {
        ...post,
        comments: [
            {
                id: uuid.v4(),
                comment: comment,
                upvotes: 0,
                downvotes: 0,
                time: new Date().toString()
            },
            ...post.comments
        ]
    }

    axios.put('http://192.168.7.230:3000/posts/' + post.id, body, config)
        .then(res => {
            // res.data is the entire post object (comments, url, id, caption)
            dispatch({ type: ADD_COMMENT_ASYNC, payload: res.data })
        })
}

export const getAllPostsAsync = () => dispatch => {

    axios.get('http://192.168.7.230:3000/posts')
        .then(res => {
            dispatch({ type: GET_ALL_POSTS_ASYNC, payload: res.data })
        })
}

export const upvotePostAsync = (post, commentID) => dispatch => {
    let postIndex = post.comments.findIndex(x => x.id === commentID);
    let body = {
        ...post,
        comments: [
            ...post.comments.slice(0, postIndex),
            {
                ...post.comments[postIndex],
                upvotes: post.comments[postIndex].upvotes + 1
            },
            ...post.comments.slice(postIndex + 1)
        ]
    }

    axios.put('http://192.168.7.230:3000/posts/' + post.id, body, config)
        .then(res => {
            dispatch({ type: UPVOTE_ASYNC, payload: res.data })
        })
}

export const downvotePostAsync = (post, commentID) => dispatch => {
    let postIndex = post.comments.findIndex(x => x.id === commentID);

    let body = {
        ...post,
        comments: [
            ...post.comments.slice(0, postIndex),
            {
                ...post.comments[postIndex],
                downvotes: post.comments[postIndex].downvotes + 1
            },
            ...post.comments.slice(postIndex + 1)
        ]
    }

    axios.put('http://192.168.7.230:3000/posts/' + post.id, body, config)
        .then(res => {
            dispatch({ type: DOWNVOTE_ASYNC, payload: res.data })
        })
}

export const setPostID = id => ({ type: SET_POST_ID, postID: id })