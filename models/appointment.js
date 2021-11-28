const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Appointment', appointmentSchema)