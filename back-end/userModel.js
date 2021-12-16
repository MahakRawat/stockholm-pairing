import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim:true,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
             throw new Error('invalid email')
        }
    },
    password:{
        type: String,
        required: false
    },
    user_name:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true
    },
    preferred_gender:{
        type: String,
        required: true
    },
    location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true
    }
    },
    address:{
         type:String,
         required:false
    },
    likes_count:{
          type: Number,
          required:false,
          default: 0
    },
    images:[
        {
            type:String,
            required: false
    
        }
    ],
    about: {
        type: String,
        required: false
    },
    dob:{
        type: String,
        required: false
    },
    interests:
        {
            type:String,
            required: false

        }
    ,
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required: false,
        }
    ],
    matches:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required: false,
        }
    ]

},{timestamps: true});
 userSchema.statics.findByCredentials= async (email,password)=> //model method
{
    const temp=await userModel.findOne({email})
    if(!temp)
      { 
          return temp;
      }
    const ismatch= await bcrypt.compare(password,temp.password)
   if(ismatch)
    return temp;
   else
      throw new Error('invalid');
}
 userSchema.index({location: '2dsphere'});  
 const userModel = mongoose.model('userModel', userSchema);
 
 export default userModel;