const qr = require('qrcode');
exports.createdqr = async(req, res) => {

   
    try {
        // Generate a random text for the QR code
        const randomText = Math.random().toString(36).substring(7);
    
        // Generate QR code as a data URL
        const qrCodeDataURL = await  qr.toDataURL(randomText);
        res.render('qrGeneratorPage', { qrCodeDataURL, randomText });
        // Send the QR code data to the client
  
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
     
};