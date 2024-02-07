// routes/getRoutes.js
const express = require('express');
const router = express.Router();
const qr = require('qrcode');

router.get('/', async (req, res) => {
  try {
    // Generate a random text for the QR code
    const randomText = Math.random().toString(36).substring(7);

    // Generate QR code as a data URL
    const qrCodeDataURL = await qr.toDataURL(randomText);

    // Send the QR code data to the client
    res.json({ qrCodeDataURL,randomText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
