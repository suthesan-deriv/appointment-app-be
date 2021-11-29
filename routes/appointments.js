const express = require('express')
const appointment = require('../models/appointment')
const router = express.Router()
const Appointment = require('../models/appointment')

// Getting all
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.json(appointments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creating one
router.post('/', checkValidation, async (req, res) => {
  const appointment = new Appointment({
    date: req.body.date,
    time: req.body.time
  })
  try {
    const newAppointment = await appointment.save()
    res.status(200).json({message: "Appointment successfuly made!", body: newAppointment})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', checkValidation, async (req, res) => {
  appointment = await Appointment.findById(req.params.id)
  if (req.body.date != null) {
    appointment.date = req.body.date
  }
  if (req.body.time != null) {
    appointment.time = req.body.time
  }
  try {
    const updatedAppointment = await appointment.save()
    res.status(200).json({message: "Appointment successfuly updated!", body: updatedAppointment})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', checkValidation, async (req, res) => {
  appointment = await Appointment.findById(req.params.id)
  try {
    await appointment.remove()
    res.status(200).json({ message: 'Deleted Appointment' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

const diffInDays = (booking_date) => {
  const diff = booking_date.getTime() - Date.now()
  return (diff / (1000 * 3600 * 24))
} 

async function checkValidation(req, res, next) {
  const booking_date = new Date(req.body.date)
  const today = new Date().getUTCDay();
  const diff_in_days = diffInDays(booking_date)

  try {
    if ((diff_in_days > 2) && (diff_in_days < 21)) {
      if (today === 4 || today === 5) {
        if (diff_in_days !== 3) {
          return res.status(400).json({ message: "Please allow at least 2 working days" })
        }
      }
    } else {
        return res.status(400).json({ message: "Please choose a date between 2 days to 3 weeks from now" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  next()
}

module.exports = router