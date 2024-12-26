const express = require('express');
const router = express.Router();
const Vet = require('../Models/Vet');

router.get('/all', async (req, res) => {
  try {
    const vets = await Vet.find();
    res.json(vets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id);
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const vet = new Vet({
    name: req.body.name,
    specialization: req.body.specialization,
    contactInfo: req.body.contactInfo
  });

  try {
    await vet.save();
    res.status(201).json({ message: 'Vet added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const vet = await Vet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json({ message: 'Vet updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const vet = await Vet.findByIdAndDelete(req.params.id);
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json({ message: 'Vet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;