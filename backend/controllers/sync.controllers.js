import { resolve } from 'path';
import db from '../db/db.js';
import { loadDataFromSheet, saveDataToSheets } from '../sheets/sheetslogic.js';
import { rejects } from 'assert';

export const loadDataController = async (req, res) => {
    try {
        const data = await loadDataFromSheet();

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM Properties', (err) => {
                if (err) {
                    reject(err);
                }
                else{
                    resolve();
                }
            });
        });

        const insertStatement = db.prepare(`INSERT INTO Properties(City, Address, ZipCode, Property_Type, Price,  Square_Feet, Beds, Bathrooms, Features, Listing_Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        for(const row of data){
            insertStatement.run([
                row.City || '',
                row.Address || '',
                row.ZipCode || '',
                row['Property Type'] || '',
                row.Price || '',
                row['Square Feet'] || '',
                row.Beds || 0,
                row.Bathrooms || 0,
                row.Features || '',
                row['Listing Type'] || ''
            ]);
        }
        insertStatement.finalize();

        res.status(200).json({message: `Data loaded from Google Sheet into SQLite.`});
    } catch (error) {
        console.error('Error loading data:', error);
        res.status(500).json({error: 'Failed to load data from Google Sheet'})
    }
};

export const saveDataController = async (req, res) => {
    try {
        db.all(`SELECT * FROM Properties`, async (err, rows) => {
            if (err) {
                console.error('DB read error:', err);
                return res.status(500).json({ error: 'Failed to read from SQLite database' });
            }

            // Format rows to match Google Sheet structure
            const formatted = rows.map(row => ({
                City: row.City,
                Address: row.Address,
                ZipCode: row.ZipCode,
                'Property Type': row.Property_Type,
                Price: row.Price,
                'Square Feet': row.Square_Feet,
                Beds: row.Beds,
                Bathrooms: row.Bathrooms,
                Features: row.Features,
                'Listing Type': row.Listing_Type
            }));

            await saveDataToSheets(formatted);

            res.status(200).json({ message: 'Data saved to Google Sheet from SQLite.' });
        });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data to Google Sheet' });
    }
};
export default {
  loadDataController,
  saveDataController
};