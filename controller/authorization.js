const jwt =  require('jsonwebtoken')
const user = require('../model/authmodel')

const authentication=async(req,res,next)=>{
    try {
        const userid = await user.findById(req.params.id)
    const usertoken= userid.Token
    if(!usertoken){
        res.status(400).json(
            "token not found"
        )
    }
    await jwt.verify(usertoken,process.env.secretkey,(err,payload)=>{
        if(err){res.json(err.message)}
        else{
            req.user=payload
            next();
        }
    })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.checkuser=async(req,res,next)=>{
    authentication(req,res,async()=>{
        const users = await user.findById(req.params.id)

        if(users.isAdmin){
            next()
        }else{
            res.json('you are not authorised to perform this action')
        }
    })
}