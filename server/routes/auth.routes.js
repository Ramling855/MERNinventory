const express=require("express")

const authrouter=express.Router()

const {signup,login}=require("../controllers/auth.controller")
const {encryptPassword}=require("../middlewares/auth.middleware")

authrouter.post("/signup",encryptPassword,signup)
authrouter.post("/login",login)
module.exports=authrouter

