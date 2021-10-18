import AddIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';
import {useState} from 'react'; 
import React from 'react';

const FileUploader = props => {
    const [m,set_m]=useState(1);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleAdd= event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    if(m===1)
    {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded,props.num);
        set_m(0);
    }
    else{
        props.handleFile(undefined,props.num);
        set_m(1);
    }
  };
  
  return (
    <div>
      {
      m===1&&
        <div>
        <AddIcon  onClick={handleAdd} style={{color:'#0066b2',position:'relative',left:'6.5rem',top:'9.5rem',fontSize:'1.8rem'}} / >
         <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
        accept="image/*"
           />
        </div>
      }
      {
          m===0&&<DeleteIcon onClick={handleChange} style={{color:'#0066b2',position:'relative',left:'6.8rem',top:'9.5rem',fontSize:'1.8rem'}}/>
      }
    </div>
  );
 } 
export default FileUploader;
