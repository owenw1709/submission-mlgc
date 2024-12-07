const express = require('express');
const firestore = require('../utils/firestore');
const router = express.Router();

router.get('/histories', async (req, res) => {
  try {
    const histories = await firestore.getHistories();
    res.status(200).json({ status: 'success', data: histories });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Error fetching histories' });
  }
});

module.exports = router;
