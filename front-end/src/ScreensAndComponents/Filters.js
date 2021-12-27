import React from 'react';
import Choice from './Choice.js';
import {useState} from 'react';
import Circle from '@material-ui/icons/CheckCircle';


export default function Filters(props) {
    const preferences=['movies','shopping','travelling','music','stand up','acting','dancing','singing','pet lover',
                   'reading','poetry','cricket','fashion','cooking','cycling','running','swimming','badminton',
                   'football','tennis','reels','yoga','foodie','sports','Netflix','photography','planting'];
  const [prefercount,set_prefercount]=useState(0);
  const [prefer,set_prefer]=useState([]);
  const [dis,set_dis]=useState(10);
  const [globally,set_globally]=useState(false);
  const [locally,set_locally]=useState(false);
  const [location,set_loc]=useState("");
  const [c1,set_c1]=useState('black');
  const [c2,set_c2]=useState('black');
   const preferhandler= (val,index,change)=>{
   if(val)
   {
       const temp=[...prefer,index];
       set_prefer(temp);
   }
   else
   {
       var temp=[];
       prefer.forEach((ele)=>{
           if(ele!==index)
             temp.push(ele);
       })
       set_prefer(temp);
   }
   set_prefercount(prefercount+change);
}
  const SelectG=(e)=>{
   set_globally(true);
   set_locally(false);
   set_loc("");
    set_c1('green');
    set_c2('black');
  }
  const SelectL=(e)=>{
   set_locally(true);
   set_globally(false);
    set_c1('black');
    set_c2('green');
  }
 const clickhandler=()=>{
     props.Apply(prefer,location,dis);
 }
    return (
        <div>
            <div>
            <h1 style={{textAlign:'center',width:'20vw'}}><u>Filters</u></h1>
            <div className="child">
               <div style={{padding:'1rem 0rem 1rem 0rem'}}><Circle style={{fontSize:'1.2rem',color: c1,cursor:'pointer'}} onClick={(e)=>SelectG(e)}></Circle>Search Globally</div>
               <div style={{padding:'1rem 0rem 1rem 0rem'}}><Circle style={{fontSize:'1.2rem',color: c2,cursor:'pointer'}} onClick={(e)=>SelectL(e)}></Circle> Search Locally</div>
               {
                   locally&&
                   (<div><input type='text' onKeyUp={(e)=>set_loc(e.target.value)} />
                   <input style={{marginTop:'2rem'}}type="range" min="0" max="1000" onChange={e=>set_dis(e.target.value)}/></div>)
               }

               <div className="label" style={{padding:'4rem 0rem 0rem 0rem'}}><h3>Add Preferences </h3><span className="message">At max 5</span></div>
               <div style={{display:'flex', width:'20vw',flexWrap:'wrap'}}>
              {
                 preferences.map((prefer,ind)=>{
                      return <Choice key={ind} interest={prefer} id={prefer} count={prefercount} choicehandler={preferhandler}/>
                     })
              }
               </div>
               <div style={{width:'25vw',textAlign:'center',padding:'2rem 0rem 0rem 0rem'}} onClick={clickhandler}><button style={{backgroundColor:'#0066b2',width:'7rem'}}>Apply</button></div>
          </div>
          </div>
        </div>
    )
}
