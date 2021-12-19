import {useState} from 'react';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {userInfoAction} from '../store.js';


function WhiteTemplate()
{
   const dispatch= useDispatch();
    let history=useHistory()
    const[email,set_email]=useState("");
    const [password, set_password]=useState("");
    const [m, set_m]=useState(0);
    const clientId='502560281329-nfuk5nhhufctpj2lib58ipqj5ah96tbg.apps.googleusercontent.com';
    async function onLoginSuccess(googleUser) {
        
            var profile = googleUser.getBasicProfile();
            const em=profile.getEmail();
            try{
                const {data}= await Axios.get(`http://127.0.0.1:4000/login?email=${em}`);    
                if(data) //already registered
                {
                   dispatch(userInfoAction(data));
                   history.push(`/mainPage`);
                }
                else //new user 
                {
                   history.push(`/form?email=${em}&password=`);
                }
             }
             catch(err)
             {
                 console.log(err);
             }  
       }
      function onLoginFailure()
       {
          console.log('failed')
       }
    async function ContinueHandler()
    {
        if(password.length>=8)
          {

            try{
               const {data}= await Axios.get(`http://127.0.0.1:4000/login?email=${email}&password=${password}`);
               if(data) //already registered
                {
                   dispatch(userInfoAction(data));
                   history.push(`/mainPage`);
                }
                else //new user 
                {
                   history.push(`/form?email=${email}&password=${password}`);
                }
             }
           catch(err)
              {
                 set_m(1); 
              }
            }
         else{
             set_m(1);
         }
    }
    
    
    return (
    <div>
    <p style={{fontSize:'1rem', color:'grey'}}>By clicking Log in you agree to our terms.</p>
              <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                       /> 
              <h2>or</h2>
               <div className="label">Enter Email</div>
               <input type="email" onChange={(e)=>{set_email(e.target.value.toLowerCase())}} value={email}></input>
               <div className="label">Enter Password</div>
               <input type="password" onChange={(e)=>{set_password(e.target.value); set_m(0);}} value={password}></input>
               {
                   m===1&&<p className="alert" style={{fontSize:'0.8rem'}}>please enter valid email and password (8 characters minimum)</p>
               }
               <button onClick={ContinueHandler} style={{marginTop:'1rem', width:'10rem', heigth:'2rem'}}>Continue</button>
    </div>
    )
}
export default WhiteTemplate;