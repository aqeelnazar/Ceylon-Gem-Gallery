const express = require('express');
const router = express.Router();
const TrackOrder = require('../models/TrackOrder'); // Adjust the path as needed

// POST route to complete a job using tracking ID
router.post('/', async (req, res) => {
  try {
    const { cutId, workerId, customerId } = req.body;

    // Find the worker
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Find the cut
    const cut = await Cut.findById(cutId);
    if (!cut) {
      return res.status(404).json({ message: 'Cut not found' });
    }

    // Find the customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create a new job tracking entry
    const newTrackOrder = new TrackOrder({
      workerID: workerId,
      cutID: cutId,
      customerID: customerId,
      trackingID: `TRACK-${Math.random().toString(36).substring(2, 8)}`, // Generate a random tracking ID
      status: 'Assigned',
    });

    // Save the new tracking entry
    await newTrackOrder.save();

    // Update the worker's workload or any additional logic
    worker.workload = (worker.workload || 0) + 1;
    await worker.save();

    // Save the changes and send a success response
    res.status(201).json({ message: 'Job assigned successfully', trackOrder: newTrackOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign job', error: error.message });
  }
});


// DELETE route to remove a job from the database using tracking ID
router.delete('/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    console.log(`Received request to delete job with tracking ID: ${trackingID}`);

    // Find and delete the job using tracking ID
    const result = await TrackOrder.deleteOne({ trackingID });
    if (result.deletedCount === 0) {
      console.log('Job not found');
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log(`Job with tracking ID: ${trackingID} deleted successfully.`);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

// Route to get all incomplete jobs
router.get('/incomplete', async (req, res) => {
  try {
    const jobs = await TrackOrder.find({ status: { $ne: 'Completed' } }); // Fetch jobs not marked as 'Completed'
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

module.exports = router;
