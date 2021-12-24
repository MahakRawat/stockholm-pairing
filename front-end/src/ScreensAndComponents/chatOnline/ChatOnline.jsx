import axios from "axios";
import { useEffect,useState } from "react";
import "./chatOnline.css";
import OnlineUser from "./OnlineUser.jsx";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [onlineMatches,setOnlineMatches]=useState([]);
  const [Matches,setMatches]=useState([]);
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
   useEffect(()=>{
     const getMatches= async ()=>{
         try{
             const {data}=await axios.get('/users/matches/'+currentId);
             setMatches(data);
         }
         catch(e)
         {
            console.log(e);
         }
     }
     getMatches();
     setOnlineMatches(Matches.filter(m=>onlineUsers.some(x=>x.userId===m)));
   },[currentId,onlineUsers]);
  return (
    <div className="chatOnline">
      {onlineMatches.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <OnlineUser id={o} />  
        </div>
      ))}
    </div>
  );
}
