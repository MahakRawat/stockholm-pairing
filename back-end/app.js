import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcrypt';
import userModel from './userModel.js';
import Axios from 'axios';

const upload= multer({dest:'./uploads'});


const app=express();


mongoose.connect("mongodb://127.0.0.1:27017",{useUnifiedTopology: true}).then(()=>{
  console.log('connected')}).catch((e)=>{
      console.log(e)
  })

app.use(express.json()); // express.json() convert the incoming json data(only) into object eg {"name":"mahak rawat"} to {name: mahak rawat}

app.use(express.urlencoded({ extended: true })); // converts the incoming x-www-form-urlencoded(only) data into object
app.use('/uploads',express.static('./uploads'));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.get('/login',async (req,res)=>{
   var user;
   console.log(req.query.email);
   if(req.query.email && req.query.password)
   {
       try{
       user= await userModel.findByCredentials(req.query.email,req.query.password); 
       }
       catch(e)
       {
           res.send(500).send();
       }
   }
   else if(req.query.email) //gmail login
   {
       user= await userModel.findOne({email:req.query.email});
   }
   console.log(user);
   res.status(200).send(user);
})


app.post('/register',upload.array("images",7),async (req,res)=>{
    var images=[];
    req.files.forEach((x)=>{
        images.push('http://localhost:4000/'+x.path);
    })
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(req.body.address)+'.json?access_token=pk.eyJ1IjoibWFoYWstcmF3YXQiLCJhIjoiY2tra3FpZjN1MDNoMjJ3bG9sdDdhdTY0ayJ9.zaTDuw_EF0IjEd3e8jwiQQ&limit=1'
     await Axios.get(url)
     .then(({data})=>{req.body.location= {longitude:data.features[0].center[0],latitude: data.features[0].center[1]}})
     .catch((err)=>{res.status(400).send(err);});
   
    req.body.password= await bcrypt.hash(req.body.password,8);

    const user= new userModel({
        ...req.body,
        images: images,
        user_name:req.body.user_name[0]
    });
    try{
       await user.save();
       res.status(200).send({userId:user._id});
    }
    catch(err){
        console.log(err);
       res.status(400).send(err);
    }
})

app.get('/search',async (req,res)=>{

    
})
const port= 4000 ;
 app.listen(port,()=>{
     console.log(`server is up on ${port}`);
 })
 
