const express = require('express')
const app = express()
const mongoose = require('mongoose')    // This allows us to connect to mongodb
require('dotenv').config()  // load all the environemnt variable from the .env files

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))   // events
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
// 'localhost:3000/subscribers/sdfsdf'

app.listen(3000, () => console.log('Server Started'))
