import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';
import conversationRoute from './routes/conversations.js';
import messageRoute from './routes/messages.js';
import cors from 'cors';

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

app.use("/users", userRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
const port= 4000 ;
 app.listen(port,()=>{
     console.log(`server is up on ${port}`);
 })
 
