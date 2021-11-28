require('dotenv').config()
var cors = require('cors')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/appointment', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

const subscribersRouter = require('./routes/appointments')
app.use('/appointments', subscribersRouter)

app.listen(8080, () => console.log('Server Started'))