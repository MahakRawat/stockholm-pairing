
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import Mark from '@material-ui/icons/DoneAllSharp';
import FileUploader from "./Fileuploader";
import Choice from "./Choice";
import {useState} from 'react';
import Axios from "axios";


function PortfolioForm(props){

const phonenumber= props.location.search.split('=')[1];
const interests=['movies','shopping','travelling','music','stand up','acting','dancing','singing','pet lover',
                   'reading','poetry','cricket','fashion','cooking','cycling','running','swimming','badminton',
                   'football','tennis','reels','yoga','foodie','sports','Netflix','photography','planting'];

const [Interestcount,set_interestcount]=useState(0);
const [Prefercount,set_prefercount]=useState(0);
const [name,set_name]=useState("");
const [dd,set_dd]=useState("");
const [mm, set_mm]=useState("");
const [yy,set_yy]=useState("");
const [gender,set_gender]=useState("");
const [prefer_gender,set_prefer_gender]=useState("");
const [m,set_m]=useState(0);
const [email,set_email]= useState("");
const [photos,set_photos]=useState([]);
const [inter,set_inter]=useState([]);
const [prefer,set_prefer]=useState([]);


const Interesthandler= (val,index,change)=>{
   if(val)
   {
       const temp=[...inter,index];
       set_inter(temp);
   }
   else
   {
       var temp=[];
       inter.forEach((ele)=>{
           if(ele!==index)
             temp.push(ele);
       })
       set_inter(temp);
   }
   set_interestcount(Interestcount+change);
}
const Preferhandler= (val,index,change)=>{
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
   };
   set_prefercount(Prefercount+change);
}
function ClickHandler1(e)
{
  const id= e.target.id;
  set_gender(id);
}
function ClickHandler2(e)
{
  const id= e.target.id;
  set_prefer_gender(id);
}
const handlefile =(file,index)=>
{
    const ele=document.querySelector('#ph'+index);
     
    if(file)
    {   
        var reader = new FileReader();
        reader.onloadend=()=>{
        ele.style.backgroundImage= `url(${reader.result})`};
        reader.readAsDataURL(file);
        const temp=[...photos,file];
        set_photos(temp);
    }
    else
    {
        var temp=[];
        photos.forEach((val)=>{
          if(val!==file)
          {
              temp.push(val);
          }
        })
        ele.style.backgroundImage="";
        set_photos(temp);
    }
}
const submitHandler= ()=>{
 if(name && email && dd && mm && yy && gender && prefer_gender &&(photos.length>=2))
 {
     var bodyFormData = new FormData();
     bodyFormData.append('user_name', name);
     bodyFormData.append('email', email);
     bodyFormData.append('gender',gender);
     bodyFormData.append('preferred_gender',prefer_gender);
     bodyFormData.append('user_name', name);
     bodyFormData.append('phonenumber',phonenumber);
     bodyFormData.append('dob', dd+'/'+mm+'/'+yy);
      bodyFormData.append('interests', inter);
     bodyFormData.append('preferences', prefer);
     photos.forEach((val)=>{
        if(val)
        {
             bodyFormData.append('images',val);
        }
     })
     console.log(inter);
     console.log(prefer);

         Axios({  method: "post",
                     url: "http://127.0.0.1:4000/register",
                     data: bodyFormData,
                     headers: { "Content-Type": "multipart/form-data" },
            }).then((res)=>{
              // props.history.push('');
              console.log(res);
            }).catch(err=>console.log(err));  
 }
 else
 {
     set_m(1);
 }
}
return (
<div style={{height:'175vh'}}>
   <div style={{display:'flex', flexDirection:'row', justifyContent:'left',padding:'1rem',borderBottom:'solid #C0C0C0 0.1rem'}}>
          <div><Ficon style={{color:'#0066b2',fontSize:"3.2rem"}} /></div>
          <div style={{color:'#505050',fontSize:'3rem'}}><b>PairUp</b></div>

   </div>
   <div><h1  style={{textAlign:'center',color:'#505050',fontStyle:'italic',padding:'2rem 4rem'}}>CREATE ACCOUNT</h1></div>
   <div style={{display:'flex', flexDirection:'row' ,justifyContent:'space-between', width:'70vw',marginTop:'4rem',top:'60%', left:'50%'}} className="center">
       <div className="col-1">
         <div className="child">
         <div className="label">Your Name <span className="message alert">*</span></div>
         <input type="text" placeholder="ABC XYZ" style={{width:'28rem', height:'3.6rem'}} onKeyUp={(e)=>set_name(e.target.value)}></input>
         </div>
         <div className="child">
         <div className="label">Birthday <span className="message alert" >*</span></div>
         <div style={{display:'flex',flexDirection:'row'}}>
          <input type="text" placeholder="dd" style={{width:'6rem',marginTop:'0.2rem',marginBottom:'0.2rem',marginRight:'0.2rem',height:'3.6rem'}} onKeyUp={(e)=>set_dd(e.target.value)}></input>
          <input type="text" placeholder="mm" style={{width:'6rem', margin:'0.2rem',height:'3.6rem'}} onKeyUp={(e)=>set_mm(e.target.value)}></input>
          <input type="text" placeholder="yyyy" style={{width:'6rem', margin:'0.2rem',height:'3.6rem'}} onKeyUp={(e)=>set_yy(e.target.value)}></input>
         </div>
         </div>
         <div className="child">
          <div className="label" >Gender <span className="message alert">*</span></div>
          <div style={{display:'flex',flexDirection:'row',listStyle:'none',justifyContent:'left'}}>
                 <div  className="gen" style={{marginLeft:'0rem'}} onClick={ClickHandler1} id='male'>
                   <div>Male</div>
                   {
                      gender==='male'&&<Mark style={{fontSize:'3rem',position:'relative',left:'2rem',top:'-2rem', color:'#0066b2'}}/>
                   }
                </div>
               <div className="gen" onClick={ClickHandler1} id='female'>
                   <div>Female</div>
                   {
                       gender==='female'&&<Mark style={{fontSize:'3rem',position:'relative',left:'2rem',top:'-2rem', color:'#0066b2'}}/>
                   }
               </div>
               <div className="gen" onClick={ClickHandler1} id='other'>
                   <div>Other</div>
                   {
                       gender==='other'&&<Mark style={{fontSize:'3rem',position:'relative',left:'2rem',top:'-2rem', color:'#0066b2'}}/>
                   }
               </div>
           </div>
          </div >
          <div className="child">
          <div className="label" >Preferred Gender <span className="message alert">*</span></div>
          <div style={{display:'flex',flexDirection:'row',listStyle:'none',justifyContent:'left'}}>
               <div  className="gen" style={{marginLeft:'0rem'}} onClick={ClickHandler2} id='men'>
                   <div>Men</div>
                   {
                      prefer_gender==='men'&&<Mark style={{fontSize:'3rem',position:'relative',left:'2rem',top:'-2rem', color:'#0066b2'}}/>
                   }
                </div>
               <div className="gen" onClick={ClickHandler2} id='women'>
                   <div>Women</div>
                   {
                       prefer_gender==='women'&&<Mark style={{fontSize:'3rem',position:'relative',left:'2rem',top:'-2rem', color:'#0066b2'}}/>
                   }
               </div>
               <div className="gen" onClick={ClickHandler2} id='everyone'>
                   <div>Everyone</div>
                   {
                       prefer_gender==='everyone'&&<Mark style={{fontSize:'3rem',position:'relative',left:'2rem',top:'-2rem', color:'#0066b2'}}/>
                   }
               </div>
          </div>
         </div>
         <div className="child">
            <div className="label">Email <span className="message alert">*</span></div>
            <input type="email" style={{width:'28rem', height:'3.6rem'}} placeholder="pqr@gmail.com" onKeyUp={(e)=>set_email(e.target.value)}></input>
             </div>
    
         <div className="child">
               <div className="label">Interests <span className="message">At max 5</span></div>
               <div style={{display:'flex', width:'30',flexWrap:'wrap'}}>
              {
                 interests.map((interest)=>{
                      return <Choice interest={interest} id={interest} count={Interestcount} choicehandler={Interesthandler}/>
                     })
              }
               </div>
         </div>
         
      </div>
  
       <div className="col-2">
          <div className="child">
          <div className="label" >Profile Photos</div>
          <div className="photo-grid">
               <div className="photo" id='ph1'><FileUploader handleFile={handlefile} num='1'/></div>
               <div className="photo" id='ph2'><FileUploader handleFile={handlefile} num='2'/></div>
               <div className="photo" id='ph3'><FileUploader handleFile={handlefile} num='3'/></div>
               <div className="photo" id='ph4'><FileUploader handleFile={handlefile} num='4'/></div>
               <div className="photo" id='ph5'><FileUploader handleFile={handlefile} num='5'/></div>
               <div className="photo" id='ph6'><FileUploader handleFile={handlefile} num='6'/></div>
          </div>
          <div className="message">Add atleast two to continue</div>
          </div>
          <div className="child">
           <div className="label">Preferences<span className="message">At max 5</span></div>
               <div style={{display:'flex', width:'30',flexWrap:'wrap'}}>
              {
                 interests.map((interest)=>{
                      return <Choice interest={interest} key={interest} count={Prefercount} choicehandler={Preferhandler}/>
                     })
              }
               </div>
               
          </div>
       </div>
   </div>
  <div style={{position:'absolute', top:'160vh',left:'43vw'}}>
   <button style={{backgroundColor:'#0066b2',border:'0rem'}} onClick={submitHandler}>continue</button>
    {
      m===1&&<div className="message alert">*Fill all the required fields</div>
    }
  </div>
</div>
);
}
export default PortfolioForm;