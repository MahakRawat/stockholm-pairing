import React from 'react';
import ProfileTemp from './ProfileTemp.js';
import User from "@material-ui/icons/Person";
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import Chat from "@material-ui/icons/ChatBubble";
import Axios from 'axios';
import {useState,useEffect} from 'react';

function MainPage() {
   const [loading,setloading]=useState(true);
   const [list,setlist]=useState([]);
    
   useEffect(() => {
     Axios.get('http://127.0.0.1:4000/search?gender=male&preferred_gender=female')
     .then(res=>{setloading(false); setlist(res.data);})
     .catch(e=>console.log(e));   
   },[])
    return (
        <div>
        <div className="nav">
         <div><User style={{fontSize:'3rem'}}></User></div>
         <div><Ficon style={{fontSize:'3rem'}}></Ficon></div>
         <div><Chat style={{fontSize:'3rem'}}></Chat></div>
        </div>
        <div className="container">
        <div className="filters">
        </div>
        <div className="card-container">
          {
             loading?<div>loading</div>
              :
                list.map(x=>
                    <ProfileTemp name={x.user_name} images={x.images} address={x.address} about={x.about}></ProfileTemp>
                )  
          }
        </div>
        </div>
        </div>
    );
}

export default MainPage
