const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const port = process.env.PORT || 5000
connectDB()
const app   = express()
const colors = require('colors')

const errorHandler = require('./Middleware/ErrorMiddleware.js')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./routes/goalRoutes.js'))
app.use('/api/users',require('./routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
