import User from "../models/user.model.js";
import { sendRes } from "../utils/response.utils.js";

export const signup = async (req, res, next)=> {
    const { name, email, password } = req.body;
    try{
        const newUser = await User.create({
            name,
            email,
            password
        })
        const token = await newUser.generateJWTToken();
        console.log(token)
       sendRes(res,200,{message:"sign up succesfully",token})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:'im in signup>catch', errmsg:error.message, stack:error.satck})
    }
}

export const login = async(req, res, next)=> {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "user not found"})
        else{
          const userLoggin = await user.comparePassword(password)
           if(!userLoggin) return res.status(401).json({message:'Invalid Password'})
           else{
           const token = await user.generateJWTToken();
           return res.status(200).json({message:'user login successfully',jwtToken:token})
        }
    }
    }
    catch(error){
        console.log(error)
       return res.status(500).json({message:'im in login>catch', errmsg:error.message})
    }
}

export const verifyAccount = (req, res, next)=> {
    try{
       return res.status(200).json({message:'im in verify-account>try'})
    }
    catch(error){
        return res.status(500).json({message:'im in verify-account>catch', errmsg:error.message})
    }
}

export const profile = (req, res, next)=> {
    try{
        req.body
        return res.status(200).json({message:"i'm in profile/try"})
    }
    catch(error){
        res.status(500).json({message:'im in profile>catch', errmsg:error.message})
    }
}