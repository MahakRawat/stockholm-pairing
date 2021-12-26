import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Video from '@material-ui/icons/Videocam';

export default function ChatBoxNav({currentChat,currentUser}) {
     const [receiver,setReceiver]=useState(null);
    
    useEffect(()=>{
       const receiverId= currentChat.members.find(memberId=>memberId!==currentUser._id);
       const getUser=async()=>{
           try{
                const {data}=await axios.get(`/users/profile?id=${receiverId}`)
                setReceiver(data);
           }
           catch(e)
           {
               console.log(e);
           }
       }
       getUser();
    },[currentChat,receiver,currentUser._id]);
    return (
        <div>
            <div className="message_nav">
            <div><img src={receiver?.images[0]} className="chatImg" alt=""></img><span style={{position:'relative',top:'-1rem'}}><b>{receiver?.user_name}</b></span></div>
            <div><a href='http://localhost:3040/' target="_blank" rel="alternate"><Video style={{fontSize:'3.5rem',color:'white'}}></Video></a></div>
            </div>
        </div>
    )
}
