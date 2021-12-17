import TinderCard from 'react-tinder-card';

function ProfileTemp(props) {
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    console.log(direction);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  return(
   <div style={{padding:'0rem 0rem 0rem 7rem'}}>
       <TinderCard className='swipe' key={props.name} onSwipe={(dir) => swiped(dir, props.name)} onCardLeftScreen={() => outOfFrame(props.name)}>
            
           {
                           <div style={{ backgroundImage: 'url(' + props.images[0] + ')' , 
                          backgroundSize:'cover',
                          backgroundPosition:'center',
                          height:'50vh',
                          width:'26vw',
                          }} 
                          className='card'>
                              <div style={{padding:'22rem 2rem 0rem 1rem'}}>
                              
                              </div>
                          </div>
            
            }
            <div style={{backgroundColor:'#0066b2', width:'26vw',height:'13rem',padding:'0.5rem 0rem 1rem 0rem'}}>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.name}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.address}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.dob}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.interests}</h4>
                <h4 style={{backgroundColor:'whitesmoke'}}>{props.about}</h4>
            </div>
      </TinderCard>
   </div>
  );
}
export default ProfileTemp;