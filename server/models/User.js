const mongoose=require("mongoose")

const Userschema=new mongoose.Schema({

    name:{
        type:String
    },

    sname:{
        type:String
    },

    email:{
        type:String,
        unique:true
    },

    password:{
        type:String
    },

    role:{
        type:String
    },

     

   
},
{
    timestamps:true
})

module.exports=mongoose.model("user",Userschema)