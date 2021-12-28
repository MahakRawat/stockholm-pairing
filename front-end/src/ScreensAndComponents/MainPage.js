import React from 'react';
import ProfileTemp from './ProfileTemp.js';
import Filters from './Filters.js';
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import Chat from "@material-ui/icons/Chat";
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function MainPage(props) {
    
    const data= useSelector(store=>store);
    if(!data)
     props.history.push('/');
    const my_id= data._id;

   const [loading,setloading]=useState(true);
   const [a,set_a]=useState("");
   const [list,setlist]=useState([]);
   const history= useHistory();
   const Apply= async(prefer,location,dis)=>{
       setloading(true);
    await Axios.get(`/users/search?gender=${data.gender}&preferred_gender=${data.preferred_gender}&location=${location}&id=${my_id}&preference=${prefer}&distance=${dis}`)
     .then(res=>{setloading(false); setlist(res.data);})
     .catch(e=>console.log(e)); 
   }

   const redirect_profile=()=>{
     history.push('/profile');
   }
   
   useEffect(() => {
     console.log(1);
      Axios.get(`/users/search?gender=${data.gender}&preferred_gender=${data.preferred_gender}&id=${data._id}`)
     .then(res=>{setloading(false); setlist(res.data);})
     .catch(e=>console.log(e));   
   },[])
    return (
        <div>
        { a?
            ( <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0,0,0,0.8)',textAlign:'center'}}>
              <div className="center" style={{height:'35rem',width:"21rem",backgroundColor:'white', borderRadius:'0.5rem',top:'40%'}}>
              <div style={{textAlign:'end'}}>
              <button style={{borderRadius:'2rem',backgroundColor:'white',border:'0.1rem solid grey',color:'black',width:'2rem',height:'2rem'}} onClick={()=>{set_a("")}}>X
              </button>
              </div>
              <img alt="abc" src="/congo.jpeg" style={{width:'20rem',height:'20rem'}}></img>
              <h1>It's a match!</h1>
              <h2>Now can start chatting with {a}</h2>
             </div>
             </div>
            )
            :  <div >
               <div className="nav">
                <div className="User"><img src={data.images[0]} className="chatImg" alt=""></img><span onClick={redirect_profile}><b>{data.user_name}</b></span></div>
               <div><Ficon style={{color:'#0066b2',fontSize:"3.2rem",cursor:'pointer'}} /></div>
               <div><Chat style={{color:'#0066b2',fontSize:'3rem',cursor:'pointer'}} onClick={()=>{history.push('/chat')}}></Chat></div>
               </div>
               <br /> 
               <div className="container">
                 <div className="filters">
                  <Filters Apply={Apply}></Filters>
                 </div>  
                <div className="card-container">    
                {
                loading?
                 <div className="center"><i class="fa fa-spinner fa-spin" style={{fontSize:'24px'}}></i>loading</div>
                :
                (!list.length)?
                 <div className="center"><h2 style={{color:'grey'}}>No results found</h2> </div>
                 :
                  <div>
                  {
                   list.map(x=>
                    <ProfileTemp name={x.user_name} images={x.images} address={x.address} about={x.about} dob={x.dob} interests={x.interests} id={x._id} set_a={set_a} my_id={my_id}></ProfileTemp>
                   ) 
                  }
                  </div>
                }
                 </div>
                 </div>
                
                 </div>
         }
           </div>
    );
}

export default MainPage
