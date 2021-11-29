import axios from 'axios';

const url='http://localhost:5001';


export const fetchPosts=()=> axios.get(url);

export const createPost=(newPost)=>{
    // window.alert("api "+JSON.stringify(newPost));
    axios.post(url, newPost);
}

export const findOrCreateUser=async (user)=>{
    console.log(user);
    const response = await axios.post(url+'/auth', user);
    console.log(response);
    return async dispatch => {
        try {
            const response = await axios.post(url+'/auth', user);
            console.log(response);
        //   dispatch(authenticate(response.data));
        } catch (ex) {
          throw ex;
        }
      };
    // console.log(temp);
}

export const getUserData=(userId)=>{
    axios.get(url+'/user/'+userId);
}