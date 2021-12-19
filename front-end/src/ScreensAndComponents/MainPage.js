import React from 'react';
import ProfileTemp from './ProfileTemp.js';
import User from "@material-ui/icons/Person";
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import Chat from "@material-ui/icons/Chat";
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';


function MainPage() {
    
    const data= useSelector(store=>store);
    const my_id= data._id;

   const [loading,setloading]=useState(true);
   const [a,set_a]=useState(0);
   const [list,setlist]=useState([]);
   
   
   const matched= ()=>{
       set_a(1);
   }
   useEffect(() => {
      Axios.get(`http://127.0.0.1:4000/search?gender=${data.gender}&preferred_gender=${data.preferred_gender}&location=${data.address}&id=${my_id}`)
     .then(res=>{setloading(false); setlist(res.data);})
     .catch(e=>console.log(e));   
   },[])
    return (
        <div>
        <div className="nav">
         <div><User style={{color:'#0066b2',fontSize:'3rem'}}></User></div>
         <div><Ficon style={{color:'#0066b2',fontSize:"3.2rem"}} /></div>
         <div><Chat style={{color:'#0066b2',fontSize:'3rem'}}></Chat></div>
        </div>
        <br />
        { a?
            ( <div style={{height:'175vh',width:'100vw',backgroundColor:'rgba(0,0,0,0.8)',textAlign:'center'}}>
              <div className="center" style={{height:'28rem',width:"21rem",backgroundColor:'white', borderRadius:'0.5rem',top:'40%'}}>
              <div style={{textAlign:'end'}}>
              <button style={{borderRadius:'2rem',backgroundColor:'white',border:'0.1rem solid grey',color:'black',width:'2rem',height:'2rem'}} onClick={()=>{set_a(0)}}>X
              </button>
              </div>
              <img alt="abc" src="/congo.jpeg" style={{width:'20rem',height:'20rem'}}></img>
              <h1>It's a match!</h1>
             </div>
             </div>
            )
            :
            <div className="container">
            <div className="filters">
            </div>
            <div className="card-container">
            {
               loading?<div><i class="fa fa-spinner fa-spin" style={{fontSize:'24px'}}></i>loading</div>
                :
                list.length?
                 list.map(x=>
                    <ProfileTemp name={x.user_name} images={x.images} address={x.address} about={x.about} dob={x.dob} interests={x.interests} id={x._id} matched={matched} my_id={my_id}></ProfileTemp>
                 )
                 :<h2>No results found</h2>  
            }
            </div>
            </div>
        }
        </div>
    );
}

export default MainPage
