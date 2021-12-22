import AddIcon from '@material-ui/icons/AddCircleSharp';
import CloseIcon from '@material-ui/icons/CancelOutlined';
import {useState} from 'react';

function Choice(props) {
  
  const [m,set_m]=useState(0);
  const clickhandler=(e)=>{
     const index=props.interest;
     if(m===0)
     {
        if(props.count<5)
        {
           props.choicehandler(1,index,1);
           set_m(1);
        }
     }
     else{
        props.choicehandler(0,index,-1); 
        set_m(0);
     }
  }
  return (
      <div className="choices">
      <div style={{textAlign:'center'}}>{props.interest}</div>
      {
       m===0&&<AddIcon style={{position:'relative', left:'5.4rem',top:'-0.2rem',color:'#0066b2' ,fontSize:'1.3rem',cursor:'pointer'}} 
               onClick={clickhandler} 
               key={props.id}
      />
       }
       {
         m===1&&<CloseIcon style={{position:'relative', left:'5.4rem',top:'-0.2rem',color:'#0066b2' ,fontSize:'1.3rem',cursor:'pointer'}} 
               onClick={clickhandler}
               key={props.id}
      />

       }
      </div>                   
  );
}

export default Choice;