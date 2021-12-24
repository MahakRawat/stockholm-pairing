import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function OnlineUser({id}){
  const [user,setUser]=useState(null);

  useEffect(()=>{
      const getProfile= async()=>{
        try{
            const {data}= await axios.get(`/users/profile?id=${id}`);
             setUser(data); 
        }
        catch(e)
        {
          console.log(e);
        }
      }
      getProfile();
  },[id]);

  return (
      <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                user?.images[0]
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
            <span className="chatOnlineName">{user?.user_name}</span>
     </div>
  )
}
      