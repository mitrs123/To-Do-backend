
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"



const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = new Schema(
    {
name:{
    type: String,
    required: [true,"enter a name"]
},
email:{
    type: String,
    required: [true,"enter a email"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [emailRegex,"please enter valid Email "]
    // validate: [validateEmail,"enter a valid email"]
},
password:{
    type: String,
    require: [true,"enter a password"],
}
    },
    {timestamps: true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
    return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    return next();
})

userSchema.methods = {
    generateJWTToken: async function(){
        return await jwt.sign(
            {
                id: this._id
            },
            "mitXsecret",
            {
                expiresIn: "24h"
            }
        );
    },
    comparePassword: async function(password){
        return await bcrypt.compare(password,this.password)
    }
}

 const User = model("User",userSchema) 

 export default User
