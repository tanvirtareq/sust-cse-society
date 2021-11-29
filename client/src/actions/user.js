import * as api  from '../api';

export const getUserData=(userId)=> async(dispatch)=>{
    try {
        const {data }=await api.getUserData(userId);
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}