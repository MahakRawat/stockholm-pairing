import React from 'react'
import { useSelector } from 'react-redux'
import Edit from '@material-ui/icons/Edit'

export default function Profile() {
    const user= useSelector(store=>store);
    
    return (
        <div className="profile">
        <div >
             <div style={{ backgroundImage: 'url(' + user.images[0] + ')' , 
                          backgroundSize:'cover',
                          backgroundPosition:'center',
                          boxShadow:'0rem 0.5rem 0.5rem 0rem rgba(0,0,0,0.3)',
                          borderRadius:'0.5rem 0.5rem 0rem 0rem',
                          height:'60vh',
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
            <div style={{textAlign:"center"}}><button>logout</button></div>
        </div>
        <div className="circle" ><Edit></Edit></div>
        </div>
    )
}
