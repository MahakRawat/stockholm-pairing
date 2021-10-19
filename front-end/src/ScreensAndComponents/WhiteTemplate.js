import {useState} from 'react';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import OTP from './OTP.js';

function WhiteTemplate(props)
{
    const [b, set_b] = useState(0);
    const [number,set_number]=useState("");
    const [m,set_m]= useState(0);
     var email=""; 
    const clientId='502560281329-nfuk5nhhufctpj2lib58ipqj5ah96tbg.apps.googleusercontent.com';
    async function onLoginSuccess(googleUser) {
        
            var profile = googleUser.getBasicProfile();
            email= profile.getEmail();
            const {data}= await Axios.get(`http://127.0.0.1:4000/login?email=${email}`);    
            if(data) //already registered
            {
                 props.history.push(`/mainPage?userId=${data}`);
            }
            else //new user 
            {
                set_b(1);
            }
            
       }
      function onLoginFailure()
       {
          console.log('failed')
       }
    async function ContinueHandler()
    {
        if(number.length===10)
        {
           const {data}= await Axios.get(`http://127.0.0.1:4000/getVerificationCode?phonenumber=${number}`);
            if(data.sent)
            {
                set_b(2);
            }
        }
        else{
            set_m(1);
        }
    }
    
    
    return (
        <div>
     {b===0 &&
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
              <button style={{width:'15rem',color:'grey',backgroundColor:'white',border:'0.2rem solid grey'}} 
                      onClick={()=>set_b(1)}>Login with mobile number</button>
    </div>
    }
    {b===1&&
      <div>
          <h3 >ENTER YOUR MOBILE NUMBER</h3>
          <input type="number" onKeyUp={(e)=>{set_number(e.target.value);}}></input>
          
         {
            m===1&&
            <p style={{color:'red',fontSize:'1rem'}}>Please enter a valid mobile number</p>
         }
          <div className="message">When you tap "Continue", we will send you a text with verification code. Message and data rates may apply. The verified phone number can be used to login.</div>
          <button onClick={ContinueHandler} style={{marginTop:'1rem'}}>Continue</button>
      </div>
    }
    {
       b===2&&
        <OTP number={number} email={email} />
    }
     </div>
    )
}
export default WhiteTemplate;