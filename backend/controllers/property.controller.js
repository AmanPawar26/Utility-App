import db from "../db/db.js";

// Get All Properties (GET)

export const getAllProperties = (req, res) => {
    db.all('SELECT * FROM Properties', (err, rows) => {
        if(err){
            console.error('DB read error:', err);
            return res.status(500).json({error: 'Failed to fetch properties'})
        }
        res.json(rows);
    });
};

// Get a property by id (GET)
export const getPropertyById = (req, res) =>{
    const {id} = req.params;
    db.all(
        'SELECT * FROM Properties WHERE id = ?',
        [id],
        (err, rows) => {
            if (err) {
                console.error('DB read error:', err);
                return res.status(500).json({error: 'Failed to fetch properties for id "${id}"'});
            }
            res.json(rows);
        }
    );
};

// Get a property by City (GET)  
export const getPropertyByCity = (req, res) => {
    const {city} = req.params;
    db.all(
        'SELECT * FROM Properties WHERE City LIKE?',
        [`%${city}%`],
        (err, rows) =>{
            if (err) {
                console.error('DB read error:', err);
                return res.status(500).json({error:'Failed to fetch properties for city "${City}"'});
            }
            res.json(rows);
        }
    );
};

// Create a property (POST)
export const createProperty = (req, res) => {
    const {
        City, Address, ZipCode, Property_Type, 
        Price, Square_Feet, Beds, Bathrooms, 
        Features, Listing_Type
    } = req.body;

    const sql = `
    INSERT INTO Properties (
    City, Address, ZipCode, Property_Type, 
    Price, Square_Feet, Beds, Bathrooms, 
    Features, Listing_Type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        City, Address, ZipCode, Property_Type, 
        Price, Square_Feet, Beds, Bathrooms, 
        Features, Listing_Type
    ];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('DB insert error:', err);
            return res.status(500).json({error: 'Failed to create property'})
        }
        res.status(201).json({id: this.lastID, message: 'Property Created'});
    });
};

// Update a property
export const updatePropertyById = (req, res) =>{
    const {id} = req.params;
    const {
        City, Address, ZipCode, Property_Type,
        Price, Square_Feet, Beds, Bathrooms,
        Features, Listing_Type
    } = req.body;

    const sql = `
    UPDATE Properties SET
     City        = ?,
      Address     = ?,
      ZipCode     = ?,
      Property_Type = ?,
      Price       = ?,
      Square_Feet = ?,
      Beds        = ?,
      Bathrooms   = ?,
      Features    = ?,
      Listing_Type = ?
      WHERE id = ?
    `;
    const params = [
        City, Address, ZipCode, Property_Type,
    Price, Square_Feet, Beds, Bathrooms,
    Features, Listing_Type,
    id 
    ];
    db.run(sql, params, function(err){
        if(err){
            console.error('DB update error:', err);
      return res.status(500).json({ error: 'Failed to update property' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ message: 'Property updated', changes: this.changes });
    })
}

// DELETE a property
export const deletePropertyById = (req, res) =>{
    const {id} = req.params;
    db.run('DELETE FROM Properties WHERE id = ?', 
    [id],
    function(err){
        if (err) {
            console.error('DB delete error:', err);
      return res.status(500).json({ error: 'Failed to delete property' });
        }
          if (this.changes === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
     res.json({ message: 'Property deleted', changes: this.changes });
    });
};
