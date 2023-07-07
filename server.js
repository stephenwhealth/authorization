require('./config/steveDB')
const express = require('express')
const mongoose = require('mongoose')
const port = 1109
const app= express()

app.use(express.json())

const router = require('./router/authrouter')

app.use(router)


app.listen(port, () => {
    console.log(`app is listen to port: ${port}`)
})