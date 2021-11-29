import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';


function UserProfile()
{
    const {id} =useParams();
    console.log(id);
    const [user, setUser] = useState();
    const [count, setCount]=useState(0);
    const [uid, setUid]=useState(null);
    let navigate=useNavigate();

    useEffect(()=>{
        // const fetchUser= async () =>{
        //     // const {data}= await axios.get('http://localhost:5001/user/'+id);
        //     // // setCount(1);
        //     // setUser(data);
        //     // console.log(user);
        // }
        // fetchUser();

        const profile=JSON.parse(localStorage.getItem('profile'));
        profile?setUser(profile):setUser(null);
        profile?setUid(uid):setUid(null);
        // user?(user._id==id?console.log("authorized"))
        (!profile || profile._id!=id)?navigate('/'):console.log('authorized');

    }, [uid]);
    
    return(
        <div>
            <div>
                hello {id}
            </div>
            {
                user!=null && (
                    <div>
                        <div>
                            name = {user.userId}
                        </div>
                        <div>
                            email = {user.email}
                        </div>
                        
                    </div>
                )
            }
        </div>
        
    );
}

export default UserProfile;