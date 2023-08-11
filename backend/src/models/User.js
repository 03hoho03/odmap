const {default:mongoose}=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    maxLength: 50,
  },
  email: {
    type:String,
    trim:true,
    unique:true,
  },
  password: {
    type:String,
    minLength:5,
  },
  role:{
    type:Number,
    default:0
  },
  image:String,
});

// userSchema.pre("save",async function (next) {
//   let user = this;
  
//   if (user.isModified('password')) {
//     const salt = await bcrypt.getSalt(10);
//   }
// })

const User = mongoose.model('User',userSchema);

module.exports = User;