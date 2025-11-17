const express = require('express');
const router = express.Router();
const Event = require('../models/EventSchema');

// Get schedule with events grouped by date and sorted by time
router.get('/', async (req, res) => {
  try {
    // Get all non-deleted events, sorted by date and time
    const events = await Event.find({ deleted: { $ne: true } })
      .sort({ date: 1, time: 1 })
      .select('title date time registrationForm venue');

    // Group events by date
    const schedule = events.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = {
          date: date,
          events: []
        };
      }
      acc[date].events.push({
        _id: event._id, // Include _id for reference
        title: event.title,
        time: event.time,
        registrationForm: event.registrationForm,
        venue: event.venue
      });
      return acc;
    }, {});

    // Convert to array and sort by date
    const result = Object.values(schedule).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    res.json(result);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Error fetching schedule' });
  }
});

// Soft delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Instead of deleting, mark as deleted
    const event = await Event.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ 
      message: 'Event removed from schedule successfully',
      event: event
    });
  } catch (error) {
    console.error('Error removing event from schedule:', error);
    res.status(500).json({ message: 'Error removing event from schedule' });
  }
});

module.exports = router;