import Axios from 'axios';
import {useState} from 'react';

function OTP(props)
{
   var code=""; 
   
   const arr=["","","","","",""];

   const  handleChange= (e) => {
      const {value, name } = e.target;
      const [fieldName, fieldIndex]=name.split("-");
        arr[parseInt(fieldIndex)]=value;
      if(value.length===1 && fieldIndex!=="6")
      {
              const nextSibling = document.querySelector(
            `input[name=${fieldName}-${parseInt(fieldIndex) + 1}]`);
             if (nextSibling !== null) {
                 nextSibling.focus();}
          
      }
     }
     const [m,set_m]=useState(0);

  async function submitHandler()
    {
        code=arr[1]+arr[2]+arr[3]+arr[4]+arr[5]+arr[6];
        
        if(code.length===6)
        {
            const {data}= await Axios.get(`http://127.0.0.1:4000/matchVerificationCode?phonenumber=${props.number}&code=${code}`);
            if(data.match) //number verified
            {
               console.log('matched');
               const {data}= await Axios.get(`http://127.0.0.1:4000/login?phonenumber=${props.number}&email=${props.email}`);  
               if(data)
               {
                    //match finding screen
               }
               else
               {
                   props.history.push(`/FormForPortfolio?phonenumber=${props.number}`);
               }
            }
            else
            {
                set_m(1);
            }
        }
        else{
            set_m(1);
        }
    }
  return (
      <div>
     <h2>ENTER OTP</h2>
    <div className="OTP">
      <input
        type="text"
        name="ssn-1"
        maxLength={1}
        onKeyUp={handleChange} style={{width:'2rem', margin:'0.2rem'}}/>
      <input
        type="text"
        name="ssn-2"
        maxLength={1}
        onKeyUp={handleChange} style={{width:'2rem', margin:'0.2rem'}}/>
      <input
        type="text"
        name="ssn-3"
        maxLength={1}
        onKeyUp={handleChange} style={{width:'2rem', margin:'0.2rem'}}/>
      <input
        type="text"
        name="ssn-4"
        maxLength={1}
        onKeyUp={handleChange} style={{width:'2rem', margin:'0.2rem'}}/>
       <input
        type="text"
        name="ssn-5"
        maxLength={1}
        onKeyUp={handleChange} style={{width:'2rem', margin:'0.2rem'}}/>
       <input
        type="text"
        name="ssn-6"
        maxLength={1}
        onKeyUp={handleChange} style={{width:'2rem', margin:'0.2rem'}}/>
    </div>
     <button onClick={submitHandler} style={{marginTop:'2rem'}}>Submit</button>
          {m===1&&
            <p style={{color:'red',fontSize:'1rem'}}>Invalid Code</p>
            }
         <div className="message">Enter the OTP which we have sent to you.</div>
    </div>
  );
};
export default OTP;