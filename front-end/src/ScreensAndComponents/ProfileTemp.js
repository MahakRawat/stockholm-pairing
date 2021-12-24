import TinderCard from 'react-tinder-card';
import Heart from '@material-ui/icons/Favorite';
import {useDispatch} from 'react-redux';
import {userInfoAction} from '../store.js';
import Axios  from 'axios';

function ProfileTemp(props) {

   const dispatch= useDispatch();
    var match=false;
  const swiped = async (id,direction) => {
      
    if(direction==='right')
    {
       const {data}= await Axios.patch(`/users/rightSwipe?user1=${props.my_id}&user2=${id}`);//user1 has rightswiped user2
       dispatch(userInfoAction(data.user));
       if(data.matched)
       {
           //match
           match=true;
       }
    }
    else if(direction==='left')
    {
        const {data}=await Axios.patch(`/users/visited?user1=${props.my_id}&user2=${id}`);
         dispatch(userInfoAction(data));
    }
  }

  const outOfFrame = async () => {
      console.log(1);
     if(match)
     {
        props.set_a(props.name);
     }
  }
  async function like(e){
      if(!e.target.style.color)
         e.target.style.color="white";

      var num;
     if(e.target.style.color==="white")
     {
         e.target.style.color="red";
         num=1;
         await Axios.patch(`/users/liked?user=${props.id}&num=${num}`);
     }
     else{
         e.target.style.color="white";
         num=-1
        await Axios.patch(`/users/liked?user=${props.id}&num=${num}`);
     }
   }
  return(
   <div>
       <TinderCard className='swipe' key={props.id} preventSwipe={['up','down']} onSwipe={(dir) => swiped(props.id,dir)} onCardLeftScreen={() => outOfFrame()}>
            
           {
                           <div style={{ backgroundImage: 'url(' + props.images[0] + ')' , 
                          backgroundSize:'cover',
                          backgroundPosition:'center',
                          boxShadow:'0rem 0.5rem 0.5rem 0rem rgba(0,0,0,0.3)',
                          borderRadius:'0.5rem 0.5rem 0rem 0rem',
                          height:'50vh',
                          width:'26vw',
                          }} 
                          className='card'>
                              <div style={{padding:'22rem 2rem 0rem 1rem'}}>
                              
                              </div>
                          </div>
            
            }
            <div style={{backgroundColor:'#0066b2', width:'26vw',height:'16rem',padding:'0.5rem 0rem 1rem 0rem',boxShadow:'0rem 0.5rem 0.5rem 0rem rgba(0,0,0,0.3)',borderRadius:'0rem 0rem 0.5rem 0.5rem',textAlign:'center'}}>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.name}</h4>
                <h4 style={{backgroundColor:'whitesmoke',overflowWrap:'break-word'}}>{props.address}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.dob}</h4>
                <h4 style={{backgroundColor:'whitesmoke',overflowWrap:'break-word'}}>{props.interests}</h4>
                <h4 style={{backgroundColor:'whitesmoke',overflowWrap:'break-word'}}>{props.about}</h4>
                <div style={{textAlign:'center'}}><Heart style={{fontSize:'3rem',color:'white',cursor:'pointer'}} onClick={like}></Heart></div>
            </div>
      </TinderCard>
   </div>
  );
}
export default ProfileTemp;