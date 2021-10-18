import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cli from 'twilio';
import multer from 'multer';
import userModel from './userModel.js';

const upload= multer({dest:'./uploads'});

const client=cli('ACf85bf74fa37499b85a384f65fdf7ecb7','b06b5895e06cd3fb44905e5c1e54bae6');
const app=express();
const SERVICE_ID= 'VAdcf3a6a543c2757f096e8aca06fc1cca';

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
   if(req.query.email)
   {
       user= await userModel.find({email:req.query.email});
   }
   else if(req.query.phonenumber)
   {
        user=await userModel.find({phonenumber});
   }
   if(user.length!==1)
      user=undefined;

   res.status(200).send(user);
})
app.post('/register',upload.array("images",7),async (req,res)=>{
    var images=[];
    req.files.forEach((x)=>{
        images.push('http://localhost:4000/'+x.path);
    })
    const user= new userModel({
        ...req.body,
        images: images
    });
    try{
       await user.save();
       res.status(200).send({});
    }
    catch(err){
       res.status(400).send(err);
    }
})
// Login Endpoint
app.get('/getVerificationCode', (req,res) => {
 
     if (req.query.phonenumber) {
        client
        .verify
        .services(SERVICE_ID)
        .verifications
        .create({
            to: `+91${req.query.phonenumber}`,
            channel: 'sms' 
        })
        .then(data => {
            res.status(200).send({
              sent:true
            });
        }) 
     } else {
        res.status(400).send({
            sent: false
        })
     }
})

// Verify Endpoint
app.get('/matchVerificationCode', (req, res) => {
  console.log(req.query.phonenumber+req.query.code)
    if (req.query.phonenumber && (req.query.code).length === 6) {
        client
            .verify
            .services(SERVICE_ID)
            .verificationChecks
            .create({
                to: `+91${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        match: true,
                    })
                }
            })
    } else {
        res.status(400).send({
            match: false
        })
    }
})
const port= 4000 ;
 app.listen(port,()=>{
     console.log(`server is up on ${port}`);
 })
 
