import React from 'react';
import ProfileTemp from './ProfileTemp.js';
import Filters from './Filters.js';
import User from "@material-ui/icons/Person";
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import Chat from "@material-ui/icons/Chat";
import Axios from 'axios';
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';


function MainPage(props) {
    
    const data= useSelector(store=>store);
    if(!data)
     props.history.push('/');
    const my_id= data._id;

   const [loading,setloading]=useState(true);
   const [a,set_a]=useState(0);
   const [list,setlist]=useState([]);
   
   const Apply= async(prefer,location,dis)=>{
       setloading(true);
    await Axios.get(`http://127.0.0.1:4000/search?gender=${data.gender}&preferred_gender=${data.preferred_gender}&location=${location}&id=${my_id}&preference=${prefer}&distance=${dis}`)
     .then(res=>{setloading(false); setlist(res.data);})
     .catch(e=>console.log(e)); 
   }
   const matched= ()=>{
       set_a(1);
   }
   useEffect(() => {
      Axios.get(`http://127.0.0.1:4000/search?gender=${data.gender}&preferred_gender=${data.preferred_gender}&id=${data._id}`)
     .then(res=>{setloading(false); setlist(res.data);})
     .catch(e=>console.log(e));   
   },[data])
    return (
        <div>
        { a?
            ( <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0,0,0,0.8)',textAlign:'center'}}>
              <div className="center" style={{height:'28rem',width:"21rem",backgroundColor:'white', borderRadius:'0.5rem',top:'40%'}}>
              <div style={{textAlign:'end'}}>
              <button style={{borderRadius:'2rem',backgroundColor:'white',border:'0.1rem solid grey',color:'black',width:'2rem',height:'2rem'}} onClick={()=>{window['location'].reload()}}>X
              </button>
              </div>
              <img alt="abc" src="/congo.jpeg" style={{width:'20rem',height:'20rem'}}></img>
              <h1>It's a match!</h1>
             </div>
             </div>
            )
            :  <div >
               <div className="nav">
               <div><User style={{color:'#0066b2',fontSize:'3rem',cursor:'pointer'}}></User></div>
               <div><Ficon style={{color:'#0066b2',fontSize:"3.2rem",cursor:'pointer'}} /></div>
               <div><Chat style={{color:'#0066b2',fontSize:'3rem',cursor:'pointer'}}></Chat></div>
               </div>
               <br />       
                {
                loading?
                 <div className="center"><i class="fa fa-spinner fa-spin" style={{fontSize:'24px'}}></i>loading</div>
                :
                (!list.length)?
                 <div className="center"><h2>No results found</h2> </div>
                 :
            
                 <div className="container">
                 <div className="filters">
                  <Filters Apply={Apply}></Filters>
                 </div>
                 <div className="card-container">
                  {
                   list.map(x=>
                    <ProfileTemp name={x.user_name} images={x.images} address={x.address} about={x.about} dob={x.dob} interests={x.interests} id={x._id} matched={matched} my_id={my_id}></ProfileTemp>
                   ) 
                  }
                 </div>
                 </div>
                 }
                 </div>
         }
           </div>
    );
}

export default MainPage
