import { View } from "../models/view";
import cron from "node-cron"

export const createView=async(req,res)=>{
    const {title,data,daysToExpire}=req.body
    console.log('Days To expire',daysToExpire)
    console.log('Days To expire type of',typeof daysToExpire)
    
    const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + parseInt(daysToExpire));
  console.log('Expiration date',expirationDate)

    try {
        const view=new View({title,data,intendedExpireAt:expirationDate,user:req.userId,userName:req.userName})
        const doc=await view.save()        
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
cron.schedule('* * * * *',async()=>{
    try {
        const currentTime=new Date()
       const doc= await View.deleteMany({intendedExpireAt:{$lte:currentTime}})
       if(doc.deletedCount)
       {
        console.log('Expired view removed',doc)        
       }
    } catch (error) {
        console.log('Error while removing expired view:',error)
    }
})

export const getViews=async(req,res)=>{
    try {
        const views=await View.find({user:req.userId})
        console.log(views)
        res.json(views)
    } catch (error) {
        res.json(error)
    }
}

export const getView=async(req,res)=>{
    const id=req.params.id
     try{
         const view=await View.findById({_id:id})
         console.log(view)
         res.status(200).json(view)
     }
     catch(err)
     {
         res.json(err)
     }
 }

export const updateView=async(req,res)=>{
    const {title,data,daysToExpire}=req.body
    const expirationDate=new Date()
    expirationDate.setDate(expirationDate.getDate()+parseInt(daysToExpire))
    try {
        const id=req.params.id
        const updatedView=await View.findOneAndUpdate({_id:id,user:req.userId},{title,data,intendedExpireAt:expirationDate},{new:true})
        res.json(updatedView)
        console.log(updateView)
    } catch (error) {
        res.json(error)
    }
}
export const deleteView=async(req,res)=>{
    const id=req.params.id
    try {
        const doc=await View.findOneAndDelete({_id:id})
        res.json({message:"View deleted Successfully"})
    } catch (error) {
        res.json(error)
    }
}
