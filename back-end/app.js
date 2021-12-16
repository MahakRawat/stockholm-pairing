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
   else if(req.query.email) //google login
   {
       user= await userModel.findOne({email:req.query.email});
   }
   //console.log(user);
   res.status(200).send(user);
})


app.post('/register',upload.array("images",7),async (req,res)=>{
    var images=[];
    req.files.forEach((x)=>{
        images.push('http://localhost:4000/'+x.path);
    })
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(req.body.address)+'.json?access_token=pk.eyJ1IjoibWFoYWstcmF3YXQiLCJhIjoiY2tra3FpZjN1MDNoMjJ3bG9sdDdhdTY0ayJ9.zaTDuw_EF0IjEd3e8jwiQQ&limit=1'
     await Axios.get(url)
     .then(({data})=>{req.body.location={type:'Point',coordinates:[data.features[0].center[0],data.features[0].center[1]]}})
     .catch((err)=>{res.status(400).send(err)});
   
    if(req.body.password)
      req.body.password= await bcrypt.hash(req.body.password,8);

    const user= new userModel({
        ...req.body,
        images: images,
        user_name:req.body.user_name[0]
    });
    try{
       await user.save();
       res.status(200).send(user);
    }
    catch(err){
       res.status(400).send(err);
    }
})

app.get('/search',async (req,res)=>{
 const gen=req.query.gender;
 const pre_gen=req.query.preferred_gender;
 const loc=req.query.location;
 const dis=req.query.distance?req.query.distance:10000;
 const prefer=req.query.preference; //array
 var list=[];
 if(loc)
 {
     var long,lat;
     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(loc)+'.json?access_token=pk.eyJ1IjoibWFoYWstcmF3YXQiLCJhIjoiY2tra3FpZjN1MDNoMjJ3bG9sdDdhdTY0ayJ9.zaTDuw_EF0IjEd3e8jwiQQ&limit=1'
     await Axios.get(url)
     .then(({data})=>{
                      long=data.features[0].center[0];
                      lat= data.features[0].center[1];
                    })
     .catch((err)=>{res.status(400).send(err)});

     list=await userModel.find({
     gender:pre_gen,
     preferred_gender:gen,
     location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ long, lat] },
            $minDistance: 0,
            $maxDistance: dis
          }
        }
    }); 
}
else
{
    list= await userModel.find({
     gender:'female',
     preferred_gender:'male',
    })
}
 if(prefer)
 {
      list= list.filter(x=>
        { 
            return (x.interests.indexOf(prefer[0])!=-1||
                     x.interests.indexOf(prefer[1])!=-1||
                     x.interests.indexOf(prefer[2])!=-1||
                     x.interests.indexOf(prefer[3])!=-1)
     });
 }
 res.status(200).send(list);
})
const port= 4000 ;
 app.listen(port,()=>{
     console.log(`server is up on ${port}`);
 })
 
