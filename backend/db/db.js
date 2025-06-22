import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error("Failed to connect to SQLite in-memory database:", err.message);
    }
    else{
        console.log("Connected to SQLite in-memory database");
        
    }
});

// const db = new sqlite3.Database('./mydata.db', (err) => {
//     if (err) {
//         console.error("Failed to connect to SQLite in-memory database:", err.message);
//     }
//     else{
//         console.log("Connected to SQLite in-memory database");
        
//     }
// });


db.serialize(() =>{
   db.run(`DROP TABLE IF EXISTS Properties`, (err) => {
    if (err) {
      console.error('Error dropping table:', err);
    } else {
      console.log('Dropped existing Properties table.');
    }
});
   
    db.run(
    `CREATE TABLE IF NOT EXISTS Properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    City TEXT,
    Address TEXT,
    ZipCode TEXT,
    Property_Type TEXT,
    Price TEXT,
    Square_Feet INTEGER,
    Beds INTEGER,
    Bathrooms INTEGER,
    Features TEXT,
    Listing_Type TEXT
    )`,
    (err) => {
        if (err) {
            console.error("Error creating Properties table:", err.message);
        }
        else{
            console.log("Properties table created sucessfully.");
            
        }
    }
  );
});

export default db;

