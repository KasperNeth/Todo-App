const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")




const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }

}, {timestamps: true});


//run this function and hash the password before saving the user
UserSchema.pre(
  "save",
  async function (next) {
    
    const user = this;
    //check if the password is modified
    if (!user.isModified("password")) return next();

    try{
      //hash the password
    const hash = await bcrypt.hash(this.password, 10)
    //set the password to the hashed password
    user.password = hash;
    next()
    }
    //catch any error that occurs
    catch (error){
      console.log(`Error in hashing password: ${error.message}`)
      return next(error)
    }
   
    
  }

);

//check if the password is valid with the hashed password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password)

  return compare;
}


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;


