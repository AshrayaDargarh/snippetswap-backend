import mongoose from "mongoose";
const {Schema}=mongoose

const viewSchema=new Schema({
    title:{type:String,required:true,default:'Untitled'},
    data:{type:String,required:true},
    intendedExpireAt:{type:Date,required:true},
    userName:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

export const View=mongoose.model('View',viewSchema)
// {
//     "title":"Ashu Bhai",
//     "data":"Ashu data is here",
//     "daysToExpire":2
//  }