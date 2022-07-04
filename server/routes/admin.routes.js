const express=require("express")
const adminrouter=express.Router();
 
const {allowAccess}=require("../middlewares/security.middleware")
adminrouter.use(allowAccess)

adminrouter.get("/showadmin",(req,res)=>{

    res.send("hello")
})


module.exports=adminrouter