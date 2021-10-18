import mongoose from 'mongoose';
import validator from 'validator';

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
    phonenumber:{
        type: Number,
        required: true
    },
    location:{
         latitude: {
              type: Number,
              required: false
         },
         longitude:{
              type: Number,
              required: false
         }
    },
    likes_count:{
          type: Number,
          required:false,
          default: 0
    },
    images:[
        {
           image:{
               type:String,
               required: false
           }
        }
    ],
    dob:{
        type: String,
        required: false
    },
    interests:[
        {
            interest:{
                type:String,
                required: false
            }
        }
    ],
    preferences:[
        {
            preference:{
                type:String,
                required: false
            }
        }
    ],
    likes:[
        {
            personId:{
               type:mongoose.Schema.Types.ObjectId,
               required: false,
            },
        }
    ],
    matches:[
        {
            personId:{
               type:mongoose.Schema.Types.ObjectId,
               required: false,
            },
        }
    ]

},{timestamps: true});

 const userModel = mongoose.model('userModel', userSchema);
 export default userModel;