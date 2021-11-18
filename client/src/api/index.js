import axios from 'axios';

const url='http://localhost:5001';


export const fetchPosts=()=> axios.get(url);

export const createPost=(newPost)=>{
    window.alert("api "+JSON.stringify(newPost));
    axios.post(url, newPost);
}

export const findOrCreateUser=(user)=>{
    axios.post(url+'/auth', user);
}