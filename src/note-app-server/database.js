const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('note.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Connected to the note.db database.');
    db.run(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        type TEXT CHECK(type IN ('unknown', 'beer', 'bills', 'delivery', 'family', 'health', 'hobby', 'house', 'travel', 'work')) NOT NULL,
        status TEXT CHECK(status IN ('todo', 'doing', 'on_hold', 'not_doing', 'done', 'archived')) NOT NULL DEFAULT 'TODO''',
        deadline DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME
    )`, (err) => {
        if (err) {
            console.error('Error creating table', err.message);
        } else {
            console.log('Table is created or already exists.');
        }
    });
});

module.exports = db;