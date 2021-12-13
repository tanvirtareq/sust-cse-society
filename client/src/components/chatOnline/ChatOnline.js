import axios from 'axios';
import { useEffect, useState } from 'react';
import './chatOnline.css';

const ChatOnline=({onlineUser, currentID, setCurrentChat})=>{

    const [onlineUserDetails, setOnlineUserDetails]=useState();
    useEffect(()=>{
        const getUserDetails= async ()=>{
            console.log(onlineUser.userID);
            const res=await axios.get('http://localhost:5001/user/'+onlineUser.userID);
            if(res)
            {
                setOnlineUserDetails(res.data);
            }
        }
        getUserDetails();
    }, []);

    const handleCurrentChat=async ()=>{
        console.log(currentID, onlineUser.userID);
        const res=await axios.get('http://localhost:5001/getConversation/'+onlineUser.userID+'/'+currentID);
        if(res)
        {
            setCurrentChat(res.data);
        }
    }

    return (
        <div className="chatOnlineFriend" onClick={handleCurrentChat}>
            <div className="chatOnlineImgContainer">
                <img
                className="chatOnlineImg"
                src={onlineUserDetails?.imageUrl}
                alt=""
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{onlineUserDetails?.userId}</span>
        </div>
    );
}

export default ChatOnline;