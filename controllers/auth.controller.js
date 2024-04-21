import User from "../models/user.model.js";

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
        res. status(200).json({message:'user created succesfully', token})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'im in signup>catch', errmsg:error.message, stack:error.satck})
    }
}

export const login = async(req, res, next)=> {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) res.status(404).json({message: "user not found"})
        else{
      console.log(password)
          const userLoggin = await user.comparePassword(password)
           if(!userLoggin) res.status(401).json({message:'Invalid Password'})
           else{
           const token = await user.generateJWTToken();
           res.status(200).json({message:'user login successfully',jwtToken:token})
        }
    }
        res.status(200).json({message:'im in login>try'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'im in login>catch', errmsg:error.message})
    }
}

export const verifyAccount = (req, res, next)=> {
    try{
        res.status(200).json({message:'im in verify-account>try'})
    }
    catch(error){
        res.status(500).json({message:'im in verify-account>catch', errmsg:error.message})
    }
}

export const profile = (req, res, next)=> {
    try{
        req.body
        res.status(200).json({message:'im in profile>try'})
    }
    catch(error){
        res.status(500).json({message:'im in profile>catch', errmsg:error.message})
    }
}