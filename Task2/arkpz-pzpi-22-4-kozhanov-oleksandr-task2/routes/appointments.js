const express = require('express');
const router = express.Router();
const Appointment = require('../Models/Appointment');

router.get('/all', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const appointment = new Appointment({
    animalId: req.body.animalId,
    vetId: req.body.vetId,
    date: req.body.date,
    reason: req.body.reason,
    status: req.body.status
  });

  try {
    await appointment.save();
    res.status(201).json({ message: 'Appointment added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;