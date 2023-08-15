import { User } from "../models/user";
import bcrypt from "bcrypt"

export const getUser=async(req,res)=>{
    try{
        const user=await User.findById({_id:req.userId})
        console.log(user)
        res.status(200).json(user)
    }
    catch(err)
    {
        res.json(err)
    }
}

export const updateUser=async(req,res)=>{
    const id=req.params.id
    try
    {
        const user=await User.findOneAndUpdate({_id:id},req.body,{new:true})
        console.log('User document data',user)
       
            const hash=bcrypt.hashSync(req.body.password,10)
            user.password=hash
        const doc=await user.save()
        res.status(200).json(doc)
    }
    catch(error)
    {
        res.json(error)
    }
}
