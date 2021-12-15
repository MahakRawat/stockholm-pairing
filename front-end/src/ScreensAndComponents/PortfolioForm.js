
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import Mark from '@material-ui/icons/DoneAllSharp';
import FileUploader from "./Fileuploader";
import Choice from "./Choice";
import {useState} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';

function PortfolioForm(props){

const email=props.location.search?props.location.search.split('&')[0].split('=')[1]:"";
const password=props.location.search?props.location.search.split('&')[1].split('=')[1]:"";
const interests=['movies','shopping','travelling','music','stand up','acting','dancing','singing','pet lover',
                   'reading','poetry','cricket','fashion','cooking','cycling','running','swimming','badminton',
                   'football','tennis','reels','yoga','foodie','sports','Netflix','photography','planting'];

const [Interestcount,set_interestcount]=useState(0);
const [name,set_name]=useState("");
const [dd,set_dd]=useState("");
const [mm, set_mm]=useState("");
const [yy,set_yy]=useState("");
const [gender,set_gender]=useState("");
const [prefer_gender,set_prefer_gender]=useState("");
const [m,set_m]=useState("");
const [photos,set_photos]=useState([]);
const [inter,set_inter]=useState([]);
const [address,set_address]=useState("");
const [about,set_about]=useState("");
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
 if(name && dd && mm && yy && gender && prefer_gender &&(photos.length>=2) && address)
 {
     console.log(name+email+dd+mm+yy+gender+prefer_gender);
     var bodyFormData = new FormData();
     bodyFormData.append('user_name', name);
     bodyFormData.append('email', email);
     bodyFormData.append('password', password);
     bodyFormData.append('gender',gender);
     bodyFormData.append('preferred_gender',prefer_gender);
     bodyFormData.append('user_name', name);
     bodyFormData.append('dob', dd+'/'+mm+'/'+yy);
     bodyFormData.append('interests', inter);
     bodyFormData.append('address', address);
     bodyFormData.append('about', about);
     photos.forEach((val)=>{
        if(val)
        {
             bodyFormData.append('images',val);
        }
       })
         Axios({  method: "post",
                     url: "http://127.0.0.1:4000/register",
                     data: bodyFormData,
                     headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res)=>{
                console.log('done');
               props.history.push(`/mainPage?id=${res.data.userId}`);
            })
            .catch(err=>{
                console.log(err);
                set_m("Unable to send your data. Check your internet connection and try again.")
            });  
 }
 else
 {
     set_m("*Fill all the required fields");
 }
}
return (
<div style={{height:'175vh'}}>
   <div style={{display:'flex', flexDirection:'row', justifyContent:'left',padding:'1rem',borderBottom:'solid #C0C0C0 0.1rem'}}>
          <div><Ficon style={{color:'#0066b2',fontSize:"3.2rem"}} /></div>
          <div><b><Link to='/' style={{color:'#505050',fontSize:'3rem'}}>PairUp</Link></b></div>

   </div>
   <div><h1  style={{textAlign:'center',color:'#505050',fontStyle:'italic',padding:'2rem 4rem'}}>CREATE ACCOUNT</h1></div>
   <div style={{display:'flex', flexDirection:'row' ,justifyContent:'space-between', width:'70vw',marginTop:'4rem',top:'60%', left:'50%'}} className="center">
       <div className="col-1">
         <div className="child">
         <div className="label">Your Name <span className="message alert">*</span></div>
         <input type="text" placeholder="abcxyz" style={{width:'28rem', height:'3.6rem'}} 
                onKeyUp={(e)=>set_name(e.target.value)}>
         </input>
         </div>
         <div className="child">
         <div className="label">Birthday <span className="message alert" >*</span></div>
         <div style={{display:'flex',flexDirection:'row'}}>
          <input type="text" placeholder="dd" style={{width:'6rem',marginTop:'0.2rem',marginBottom:'0.2rem',marginRight:'0.2rem',height:'3.6rem'}} 
                  onKeyUp={(e)=>set_dd(e.target.value)}>
          </input>
          <input type="text" placeholder="mm" style={{width:'6rem', margin:'0.2rem',height:'3.6rem'}} 
                  onKeyUp={(e)=>set_mm(e.target.value)}>
          </input>
          <input type="text" placeholder="yy" style={{width:'6rem', margin:'0.2rem',height:'3.6rem'}} 
                  onKeyUp={(e)=>set_yy(e.target.value)}>
          </input>
         </div>
         </div>
         <div className="child">
          <div className="label">Gender <span className="message alert">*</span></div>
          <div style={{display:'flex',flexDirection:'row',listStyle:'none',justifyContent:'left'}}>
                 <div  className="gen" style={{marginLeft:'0rem'}} onClick={ClickHandler1} id='male'>
                   <div>Male</div>
                   {
                      gender==='male'&&<Mark style={{fontSize:'3rem'}} className="mark"/>
                   }
                </div>
               <div className="gen" onClick={ClickHandler1} id='female'>
                   <div>Female</div>
                   {
                       gender==='female'&&<Mark style={{fontSize:'3rem'}} className="mark"/>
                   }
               </div>
               <div className="gen" onClick={ClickHandler1} id='other'>
                   <div>Other</div>
                   {
                       gender==='other'&&<Mark style={{fontSize:'3rem'}} className="mark"/>
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
                      prefer_gender==='men'&&<Mark style={{fontSize:'3rem'}} className="mark"/>
                   }
                </div>
               <div className="gen" onClick={ClickHandler2} id='women'>
                   <div>Women</div>
                   {
                       prefer_gender==='women'&&<Mark style={{fontSize:'3rem'}} className="mark"/>
                   }
               </div>
               <div className="gen" onClick={ClickHandler2} id='everyone'>
                   <div>Everyone</div>
                   {
                       prefer_gender==='everyone'&&<Mark style={{fontSize:'3rem'}} className="mark"/>
                   }
               </div>
          </div>
         </div>
         
         <div className="child">
               <div className="label">Interests <span className="message">At max 5</span></div>
               <div style={{display:'flex', width:'30',flexWrap:'wrap'}}>
              {
                 interests.map((interest,ind)=>{
                      return <Choice key={ind} interest={interest} id={interest} count={Interestcount} choicehandler={Interesthandler}/>
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
           <div className="label">Your Location <span className="message alert">*</span> <span style={{color:'GrayText'}}>(city district state)</span></div>
            <input type="text" style={{width:'28rem', height:'3.6rem'}} 
                   onKeyUp={(e)=>set_address(e.target.value)}></input>
             <div className="message">You can change this later whenever your location changes</div>
          </div>
          <div className="child">
           <div className="label">About Yourself </div>
            <input type="text" style={{width:'28rem', height:'3.6rem'}} 
                   onKeyUp={(e)=>set_about(e.target.value)}></input>
          </div>
       </div>
   </div>
  <div style={{position:'absolute', top:'160vh',left:'43vw'}}>
   <button style={{backgroundColor:'#0066b2',border:'0rem'}} onClick={submitHandler}>continue</button>
    {
      m!==""&&<div className="message alert">{m}</div>
    }
  </div>
</div>
);
}
export default PortfolioForm;