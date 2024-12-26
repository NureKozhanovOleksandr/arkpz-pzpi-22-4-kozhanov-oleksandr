const express = require('express');
const router = express.Router();
const HealthRecord = require('../Models/HealthRecord');

router.get('/all', async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find();
    res.json(healthRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) return res.status(404).json({ message: 'Health record not found' });
    res.json(healthRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const healthRecord = new HealthRecord({
    animalId: req.body.animalId,
    date: req.body.date,
    diagnosis: req.body.diagnosis,
    treatment: req.body.treatment,
    notes: req.body.notes,
    vetId: req.body.vetId,
    temperature: req.body.temperature,
    pulse: req.body.pulse,
    bloodSugar: req.body.bloodSugar
  });

  try {
    await healthRecord.save();
    res.status(201).json({ message: 'Health record added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!healthRecord) return res.status(404).json({ message: 'Health record not found' });
    res.json({ message: 'Health record updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) return res.status(404).json({ message: 'Health record not found' });

    await healthRecord.deleteOne();

    res.json({ message: 'Health record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/check-critical/:animalId', async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({ animalId: req.params.animalId });
    const criticalMessages = [];

    healthRecords.forEach(record => {
      if (record.temperature > 39 || record.temperature < 36) {
        criticalMessages.push(`Critical temperature: ${record.temperature}°C on ${record.date}`);
      }
      if (record.pulse > 120 || record.pulse < 60) {
        criticalMessages.push(`Critical pulse: ${record.pulse} bpm on ${record.date}`);
      }
      if (record.bloodSugar > 140 || record.bloodSugar < 70) {
        criticalMessages.push(`Critical blood sugar: ${record.bloodSugar} mg/dL on ${record.date}`);
      }
    });

    res.json({ messages: criticalMessages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
