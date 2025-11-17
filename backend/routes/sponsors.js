const express = require('express');
const router = express.Router();
const Sponsor = require('../models/SponsorshipSchema');

// Get all sponsors
router.get('/', async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ category: 1, name: 1 });
    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new sponsor
router.post('/', async (req, res) => {
  const { name, website, logo, category } = req.body;
  const sponsor = new Sponsor({ name, website, logo, category });
  
  try {
    await sponsor.save();
    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single sponsor by ID
router.get('/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a sponsor
router.delete('/:id', async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sponsor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;