const user = require('../model/authmodel')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const mongoose=require('mongoose')


// creating a data

exports.newUser=async(req,res)=>{
    try {
        const{Username,Email,Password}=req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(Password, salt)

        const body= {
            Username,
            Email,
            Password:hash
        }
        const newdata =await user.create(body)
        const token = jwt.sign({
            id:user._id,
            Password:user.Password
        },
        process.env.secretkey,{expiresIn:"1d"}
        )
        newdata.Token=token
        newdata.save()

        if(newdata){
           res.status(201).json({
            message: 'data created successfully',
            data: newdata
        })
        }else{
           res.status(400).json({
            message: 'no data created'
           })
           }
        } catch (error) {
            res.status(500).json({
            message: error.message
            })
    }
}


// To login 

exports.loginuser=async(req,res)=>{
    try {
        const {Username, Password, Email }= req.body
        const checkusername = await user.findOne({$or:[{Username}, {Email}]})
        // const checkEmail = await user.findOne({Email})
        if (!checkusername) {
            return res.status(404).json({
                message: 'username not correct'
            })
        }
        const checkpassword = bcrypt.compareSync(Password, checkusername.Password)
        if(!checkpassword){
            return res.status(404).json({
                message: 'password not correct'
            })
        }else{
            const usertoken = jwt.sign({
                id:checkusername._id,
                Password:checkusername.Password
            },
            process.env.secretkey,{expiresIn:"1d"}
            )
            checkusername.Token=usertoken
            checkusername.save()
            res.status(200).json({
               message: 'login successfull',
               data: [checkusername.Username, 
               checkusername.Email,
               checkusername.Token
            ]
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.findAll=async(req,res)=>{
    try {
        const alldata = await user.find()
        if(!alldata){
            res.status(500).json({
                message: 'no data found'
            })
        }else{
            res.status(200).json({
                message: 'this is the available datas on the database',
                data: alldata
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateone=async(req,res)=>{
    try {
        const id= req.params.id
        const updated= await user.findByIdAndUpdate(id,{isAdmin:true})
        if(!id){
        res.status(400).json({
            message: 'the searched id is not found'
        })
        }else{
            res.status(201).json({
            message: 'the data has been updated'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

// updating a data

exports.updated=async(req,res)=>{
    try {
        const userid= req.params.id
        const update= await user.findByIdAndUpdate(userid,req.body,{new:true})
        if(!update){
        res.status(400).json({
            message: 'the searched id is not found'
        })
        }else{
            res.status(201).json({
            message: 'the data has been updated'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}


// deleting with authorization

exports.deleted=async(req,res)=>{
    try {
        const userid= req.params.id
        const deleteuser= await user.findByIdAndDelete(userid,req.body,{new:true})
        if(!deleteuser){
        res.status(400).json({
            message: 'the searched id is not found'
        })
        }else{
            res.status(201).json({
            message: 'the data has been deleted',
            data: deleteuser
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}