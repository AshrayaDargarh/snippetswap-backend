import express from "express"
import { createView,getViews,updateView,deleteView,getView } from "../controllers/view"
// ,updateView,deleteView
export const viewRouter=express.Router()

viewRouter
.post('/',createView)
.get('/',getViews)
.get('/:id',getView)
.patch('/:id',updateView)
.delete('/:id',deleteView)