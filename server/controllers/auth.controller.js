const User=require("../models/User")
const {passwordCompare,jwtGen}=require("../utils/utils")
const signup=(req,res)=>{
    console.log(req.body)
    const user=new User({

        name:req.body.name,
        sname:req.body.sname,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })

    user.save().then(data=>{

        res.json({
            message:"Successfully registered"
        })

    }).catch(err=>{

        res.json({
            message:"User already registered"
        })


    })

}


const login=(req,res)=>{

    console.log(req)
   
    User.findOne({email:req.body.email}).then(result=>{

        //we have to compare the passwords
       
        passwordCompare(result.password,req.body.password).then(data=>{

            //console.log("dbpassword",result.password)
            //console.log("entered password",req.body.password)
               
            if(data){

              jwtGen({username:result.email}).then(token=>{
                     
                    res.json({
                        message:"Login Success",
                        token:token
                    })


                }).catch(err=>{
                    console.log(err)
                })

               
            }

            else{

                
                res.json({
                    message:"Login Failed"
                })

            }
        })



    }).catch(err=>{

        res.json({
            message:"No user found !!"
        })
    })

}

module.exports={

    signup,
    login
      
}