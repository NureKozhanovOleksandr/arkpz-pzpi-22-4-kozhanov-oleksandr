const express = require('express');
const router = express.Router();
const Owner = require('../Models/Owner');

/**
 * @route GET /all
 * @description Get all owners
 * @access Public
 */
router.get('/all', async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /:id
 * @description Get owner by ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });
    res.json(owner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route POST /add
 * @description Add a new owner
 * @access Public
 */
router.post('/add', async (req, res) => {
  const owner = new Owner({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    animals: []
  });

  try {
    await owner.save();
    res.status(201).json({ message: 'Owner added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route PUT /:id
 * @description Update an owner by ID
 * @access Public
 */
router.put('/:id', async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!owner) return res.status(404).json({ message: 'Owner not found' });
    res.json({ message: 'Owner updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route DELETE /:id
 * @description Delete an owner by ID
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    await owner.deleteOne();

    res.json({ message: 'Owner deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
