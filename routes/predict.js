
const express = require('express');
const multer = require('multer');
const modelHandler = require('../models/modelHandler');
const firestore = require('../utils/firestore');
const router = express.Router();

// Setup Multer for file upload
const upload = multer({
  limits: { fileSize: 1000000 }, // 1 MB limit
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
    }

    const result = await modelHandler.predict(req.file.buffer);
    const id = require('crypto').randomUUID();
    const prediction = {
      id,
      result,
      suggestion: result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Anda sehat!',
      createdAt: new Date().toISOString(),
    };

    await firestore.savePrediction(prediction);

    res.status(200).json({ status: 'success', message: 'Model is predicted successfully', data: prediction });
  } catch (error) {
    if (error.message.includes('Payload content length')) {
      return res.status(413).json({ status: 'fail', message: error.message });
    }
    res.status(400).json({ status: 'fail', message: 'Terjadi kesalahan dalam melakukan prediksi' });
  }
});

module.exports = router;
