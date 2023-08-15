import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import path from "path"
dotenv.config()
import { authRouter } from "./routes/auth.js"
import { viewRouter } from "./routes/view.js"
import { userRouter } from "./routes/user.js"
import jwt from "jsonwebtoken"
import { View } from "./models/view.js"
const app=express()

// db connection
main().catch(err=>console.log(err))
async function main()
{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB Connected")
}
const auth=(req,res,next)=>{
    try{
        const token=req.get('Authorization').split('Bearer ')[1]
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(decoded.userId)
        {
            req.userId=decoded.userId
            req.userName=decoded.userName
            next()
        }
    }
    catch(error)
    {
        res.sendStatus(401)
    }
}
// middleware
app.use(json())
app.use(cors())
app.use('/auth',authRouter)
app.use('/view',auth,viewRouter)
app.use('/user',auth,userRouter)

app.get('/public/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const view=await View.findById({_id:id})
        res.json(view)
    } catch (error) {
        res.json(error)
    }
})
app.get("/",(req,res)=>{
    res.send("<h1>Home route working sexy</h1>")
})
const PORT=process.env.PORT_URL || 4000
app.listen(PORT,()=>{  
    console.log(`Server is listing at http://localhost:${PORT}`)
})