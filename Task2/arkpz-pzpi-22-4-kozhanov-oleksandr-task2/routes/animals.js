const express = require('express');
const router = express.Router();
const Animal = require('../Models/Animal');
const Owner = require('../Models/Owner');

/**
 * @route GET /all
 * @description Get all animals
 * @access Public
 */
router.get('/all', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /:id
 * @description Get animal by ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route POST /add
 * @description Add a new animal
 * @access Public
 */
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

    const owner = await Owner.findById(req.body.ownerId);
    if (owner) {
      owner.animals.push(newAnimal._id);
      await owner.save();
    }

    res.status(201).json({ message: 'Animal added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route PUT /:id
 * @description Update an animal by ID
 * @access Public
 */
router.put('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json({ message: 'Animal updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route DELETE /:id
 * @description Delete an animal by ID
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    await animal.deleteOne();

    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;