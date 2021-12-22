import {useState} from 'react';
import WhiteTemplate from './WhiteTemplate.js';
import Ficon from "@material-ui/icons/FilterVintageTwoTone";
import {Link} from 'react-router-dom';

function LoginScreen()
{
     
     const [a, set_a] = useState(0);
      
      return(
           <div className="background">
             <div style={{backgroundColor:'#FFE4B5',height:'4rem',display:'flex',flexDirection:'row',justifyContent:'space-between',padding:'0.5rem'}}>
                     <div style={{display:'flex', flexDirection:'row', justifyContent:'left',marginTop:'0.5rem'}}>
                         <div><Ficon style={{color:'#0066b2',fontSize:"3.2rem"}} /></div>
                         <div><b><Link to='/' style={{color:'black',fontSize:'3.2rem'}}>PairUp</Link></b></div>
                     </div>
                     <div>
                         <button style={{marginTop:'1rem',marginleft:'1rem',height:'2rem',width:'8rem'}} onClick={()=>{set_a(1)}}>Login</button>
                     </div>
            </div>
            { a?
            ( <div style={{height:'100vh',width:'100vw',backgroundColor:'rgba(0,0,0,0.8)',textAlign:'center'}}>
              <div className="center" style={{height:'28rem',width:"21rem",backgroundColor:'white', borderRadius:'0.5rem',top:'25%'}}>
              <div style={{textAlign:'end'}}><button style={{borderRadius:'2rem',backgroundColor:'white',border:'0.1rem solid grey',color:'black',width:'2rem',height:'2rem'}} onClick={()=>{set_a(0)}}>X</button></div>
              <WhiteTemplate />
             </div>
             </div> 
            )
               : 
              <div className="center">
                 <p style={{fontSize:'3rem'}}><b>Find your prefect match here!</b></p>
                 <button className="center" style={{top:'95%'}} onClick={()=>{set_a(1)}}>Create Account</button>
              </div>
               
           }
          </div>
      )
}
export default LoginScreen;