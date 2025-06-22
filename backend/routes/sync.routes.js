import express from 'express';
import { loadDataController, saveDataController } from '../controllers/sync.controllers.js';
import db from '../db/db.js';

const router = express.Router();

router.get('/load', loadDataController);
router.post('/save', saveDataController);

// Debug route to view all data
router.get('/debug', (req, res) => {
  db.all('SELECT * FROM Properties', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database read error' });
    }
    res.json(rows);
  });
});

// INSERT TEST ROUTE
router.post('/insert-test', (req, res) => {
  db.run(
    `INSERT INTO Properties (
      City, Address, ZipCode, Property_Type, Price,
      Square_Feet, Beds, Bathrooms, Features, Listing_Type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'Test City two',
      '123 Test St',
      '00000',
      'Test Type',
      '$999',
      999,
      9,
      9,
      'Test two Feature',
      'Test two Listing'
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Insert failed', details: err.message });
      }
      res.json({ message: 'Test data inserted', id: this.lastID });
    }
  );
});

export default router;
