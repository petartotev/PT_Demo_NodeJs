const sqllite = require('sqlite3').verbose();

let db = new sqllite.Database('note.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to db...');
        db.run(`CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT,
            createdAt DATETIME)`,
            (err) => {
                if (err) {
                    console.log('Table already created!');
                }
            });
    }
});

module.exports = db;