const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const { createTokenForUser } = require("../services/auth");

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt: {
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYPRLSISP2uoEdGxNPVFrz02gI2KWiJ_VwNA&usqp=CAU"
    },
    role:{
        type:String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    } 
},{timestamps:true});

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    user.salt = salt;
    user.password = hashedPassword;
    next();

});

userSchema.static(
    "matchPasswordAndGenerateToken",
    async function (email, password) {
      const user = await this.findOne({ email });
      if (!user) throw new Error("User not found!");
  
      const salt = user.salt;
      const hashedPassword = user.password;
  
      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
  
      if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");
  
      const token = createTokenForUser(user);
      return token;
    }
  );

//Export the model
const User = model('User', userSchema);

module.exports = User;