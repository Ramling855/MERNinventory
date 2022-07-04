const { response } = require("../app")
const User=require("../models/User")

const getUSerdata=(req,res)=>{

    
    User.find().then(response=>{

         res.json({

           
            data:response
        })
 
       

    })
    
    //will be querying the data

    

}

module.exports={
    getUSerdata
     
}