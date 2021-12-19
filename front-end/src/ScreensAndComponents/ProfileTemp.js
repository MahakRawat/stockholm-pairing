import TinderCard from 'react-tinder-card';
import Heart from '@material-ui/icons/Favorite';
import {useDispatch} from 'react-redux';
import {userInfoAction} from '../store.js';
import Axios  from 'axios';

function ProfileTemp(props) {

  //const [lastdirection,set_lastdirection]=useState("");
   const dispatch= useDispatch();
  const swiped = async (id,direction) => {
      console.log(direction);
    if(direction==='right')
    {
       const {data}= await Axios.patch(`http://127.0.0.1:4000/rightSwipe?user1=${props.my_id}&user2=${id}`);//user1 has rightswiped user2
       dispatch(userInfoAction(data.user));
       if(data.matched)
       {
           //match
           props.matched();
       }
    }
    else if(direction==='left')
    {
        const {data}=await Axios.patch(`http://127.0.0.1:4000/visited?user1=${props.my_id}&user2=${id}`);
         dispatch(userInfoAction(data));
    }
  }

  const outOfFrame = async (id) => {
    
  }
  async function like(e){
      if(!e.target.style.color)
         e.target.style.color="white";

      var num;
     if(e.target.style.color==="white")
     {
         e.target.style.color="red";
         num=1;
         await Axios.patch(`http://127.0.0.1:4000/liked?user=${props.id}&num=${num}`);
     }
     else{
         e.target.style.color="white";
         num=-1
        await Axios.patch(`http://127.0.0.1:4000/liked?user=${props.id}&num=${num}`);
     }
   }
  return(
   <div style={{padding:'0rem 0rem 0rem 4rem'}}>
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
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.address}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.dob}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.interests}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.about}</h4>
                <div style={{textAlign:'center'}}><Heart style={{fontSize:'3rem',color:'white'}} onClick={like}></Heart></div>
            </div>
      </TinderCard>
   </div>
  );
}
export default ProfileTemp;