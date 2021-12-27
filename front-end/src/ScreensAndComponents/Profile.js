import React from 'react'
import { useSelector } from 'react-redux'
import Edit from '@material-ui/icons/Edit'
import {useHistory} from 'react-router-dom'

export default function Profile() {
    const user= useSelector(store=>store);
    const history= useHistory();
    const redirect_portfolio=()=>{
        history.push('/form');
    }
    return (
        <div className="profile">
        <div >
             <div style={{ backgroundImage: 'url(' + user.images[0] + ')' , 
                          backgroundSize:'cover',
                          backgroundPosition:'center',
                          boxShadow:'0rem 0.5rem 0.5rem 0rem rgba(0,0,0,0.3)',
                          borderRadius:'0.5rem 0.5rem 0rem 0rem',
                          height:'65vh',
                          width:'40vw',
                          }} 
                          className='card'>
             </div>
             <div style={{backgroundColor:'#0066b2', width:'40vw',height:'15rem',padding:'0.5rem 0rem 1rem 0rem',boxShadow:'0rem 0.5rem 0.5rem 0rem rgba(0,0,0,0.3)',borderRadius:'0rem 0rem 0.5rem 0.5rem',textAlign:'center'}}>
                <h4 style={{backgroundColor:'whitesmoke'}}>{user.user_name}</h4>
                <h4 style={{backgroundColor:'whitesmoke',overflowWrap:'break-word'}}>{user.address}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{user.dob}</h4>
                <h4 style={{backgroundColor:'whitesmoke',overflowWrap:'break-word'}}>{user.interests}</h4>
                <h4 style={{backgroundColor:'whitesmoke',overflowWrap:'break-word'}}>{user.about}</h4>
            </div>
        </div>
        <div className="circle" onClick={redirect_portfolio}><Edit></Edit></div>
        </div>
    )
}
