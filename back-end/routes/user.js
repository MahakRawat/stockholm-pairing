import express from "express";
import bcrypt from 'bcrypt';
import multer from 'multer';
import userModel from "../models/userModel.js";
import axios from 'axios';

const upload= multer({dest:'./uploads'});
const router = express();
router.get('/login',async (req,res)=>{
   var user;
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
       try{
          user= await userModel.findOne({email:req.query.email});
       }
       catch(e)
       {
           res.send(500).send();
       }
   }
   //console.log(user);
   if(user)
     res.status(200).send(user);
   else
     res.status(500).send();
})
router.get('/profile',async (req,res)=>{
    const user= await userModel.findOne({_id:req.query.id});
    res.status(200).send(user);
})

router.post('/register',upload.array("images",7),async (req,res)=>{
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

router.get('/search',async (req,res)=>{
 const id=req.query.id; 
 const gen=req.query.gender;
 const pre_gen=req.query.preferred_gender;
 const loc=req.query.location;
 const dis=req.query.distance?parseInt(req.query.distance)*1000:1000000;
 const Prefer=req.query.preference; //string
 const user= await userModel.findOne({_id:id});
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
     gender:pre_gen,
     preferred_gender:gen,
    })
}
 var newList =list.filter(x=>{
     const val= user.visited.every(y=>{return (x._id.toString()!=y.toString())});
      return (x._id.toString()!=id)&&(val);
     });

 if(Prefer)
 {
     const prefer= Prefer.split(",");
      newList= newList.filter(x=>
        { 
            return (x.interests.indexOf(prefer[0])!=-1||
                     x.interests.indexOf(prefer[1])!=-1||
                     x.interests.indexOf(prefer[2])!=-1||
                     x.interests.indexOf(prefer[3])!=-1)
     });
 }
 res.status(200).send(newList);
})
router.patch('/rightSwipe',async (req,res)=>{
  const user1_id=req.query.user1;
  const user2_id=req.query.user2;
  const user1=await userModel.findOne({_id:user1_id});
  const user2=await userModel.findOne({_id:user2_id});
  user1.rightSwipe.push(user2_id);
  user1.visited.push(user2_id);
  if(!user2.rightSwipe.every(x=> {return x!=user1_id}))
  {
      //it's a match
      user1.matches.push(user2_id);
      user2.matches.push(user1_id);
      try{
          await user1.save();
          await user2.save();
          await axios.post(`http://127.0.0.1:4000/conversations`,{senderId:user1_id,receiverId:user2_id});
          res.status(200).send({user:user1,matched:true});
      }
      catch(e)
      {
          console.log(e);
          res.status(500).send(e);
      }
  }
  else
  {
      await user1.save();
      res.status(200).send({user:user1,matched:false});
  }
  
})

router.patch('/visited',async(req,res)=>{
   const user1_id=req.query.user1;
   const user2_id=req.query.user2; 
   const user1= await userModel.findOne({_id:user1_id});
   user1.visited.push(user2_id);
  await user1.save();
  res.status(200).send(user1);
})
router.patch('/liked',async(req,res)=>{
    const user=await userModel.findOne({_id:req.query.user})
    user.likes_count=user.likes_count+parseInt(req.query.num);
    await user.save();
    res.send();
})
router.get('/matches/:userId',async(req,res)=>{
   try{
       const user= await userModel.findOne({_id:req.params.userId});
       res.status(200).send(user.matches);
   } 
   catch(e)
   {
       res.status(500).send();
   }
})
export default router;