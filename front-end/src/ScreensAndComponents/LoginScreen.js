import {useState} from 'react';
import GoogleLogin from 'react-google-login';
function LoginScreen()
{
     const clientId='502560281329-nfuk5nhhufctpj2lib58ipqj5ah96tbg.apps.googleusercontent.com';
       function onLoginSuccess(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
       }
       function onLoginFailure()
       {

       }
    const [a, set_a] = useState(0);
      return(
           <div className="background">
            <div style={{backgroundColor:'#FFE4B5',height:'4rem',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                       <div style={{fontSize:'3rem',textAlign:'center',marginLeft:'1rem'}}><b>Stockholm Pairing</b>
                       </div>
                       <div><button style={{marginTop:'1rem',marginleft:'1rem',height:'2rem',width:'8rem'}} onClick={()=>{set_a(2)}}>Login</button></div>
                  </div>
            { a?
            (<div style={{height:'175vh',width:'100vw',backgroundColor:'rgba(0,0,0,0.8)',textAlign:'center'}}>
             <div className="center" style={{height:'28rem',width:"20rem",backgroundColor:'white', borderRadius:'0.5rem',top:'25%'}}>
              <div style={{textAlign:'end'}}><button style={{borderRadius:'2rem',backgroundColor:'white',border:'0.1rem solid grey',color:'black',width:'2rem',height:'2rem'}} onClick={()=>{set_a(0)}}>X</button></div>
            <h2>Login with google</h2>
            <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    data-theme={true}
                /> 
              <h2>or</h2>
              <h2>Enter mobile number</h2>
              <input type="number"></input> 
                  <div>
                  <h2>Password</h2>
                  <input type="text"></input>
                  </div>

             </div>
             </div> 
            )
               : 
              <div className="center">
                 <p style={{fontSize:'3.5rem'}}><b>Find your prefect match here!</b></p>
                 <button className="center" style={{top:'80%'}} onClick={()=>{set_a(1)}}>Create Account</button>
              </div>
               
           }
          </div>
      )
}
export default LoginScreen;