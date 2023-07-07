const {newUser, loginuser, findAll, updateone, updated, deleted} = require('../controller/authcontroller')
const {checkuser} = require('../controller/authorization')

const router = require("express").Router()

router.route('/').get((req,res)=>{
    res.json('welcome to my database')
})
router.route('/signup').post(newUser)
router.route('/login').post(loginuser)
router.route('/findall').get(findAll)
router.route('/:id/findall').get(checkuser,findAll)
router.route('/:id/update').put(updateone)
router.route('/:id/update/:userid').put(checkuser,updated)
router.route('/:id/delete/:userid').delete(checkuser,deleted)


module.exports= router