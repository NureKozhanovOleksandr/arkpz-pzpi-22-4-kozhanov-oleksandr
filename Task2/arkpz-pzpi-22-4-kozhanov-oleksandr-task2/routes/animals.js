const express = require('express');
const router = express.Router();
const Animal = require('../Models/Animal');

router.get('/all', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age,
    weight: req.body.weight,
    ownerId: req.body.ownerId,
    healthRecordsIds: req.body.healthRecordsIds,
    lastVisit: req.body.lastVisit
  });

  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;