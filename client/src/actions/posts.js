import * as api  from '../api';

export const getPosts=()=> async(dispatch)=>{
    try {
        const {data }=await api.fetchPosts();
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost=(post)=> async(dispatch)=>{
    // window.alert(post.creator);
    try {
        // window.alert(JSON.stringify(post));
        const {data}=await api.createPost(post);
        // window.alert(JSON.stringify(data)+' data ');
        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}