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
   <div>
       <TinderCard className='swipe' key={props.name} onSwipe={(dir) => swiped(dir, props.name)} onCardLeftScreen={() => outOfFrame(props.name)}>
            
           {
            
                           <div style={{ backgroundImage: 'url(' + props.images[0] + ')' , 
                          backgroundSize:'cover',
                          backgroundPosition:'center',height:'50vh',
                          width:'26vw'
                          }} 
                          className='card'></div>
                         
        
            }
              <h3>{props.name}</h3>
              <h3>{props.address}</h3>
              <p>{props.about}</p>
      </TinderCard>
   </div>
  );
}
export default ProfileTemp;