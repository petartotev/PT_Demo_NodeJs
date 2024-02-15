const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/notes', (req, res) => {
    var sql = 'SELECT * FROM notes;';
    var params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/api/notes', (req, res) => {
    var errors = [];
    if (!req.body.content) {
        errors.push('No content is supplied!')
    }
    if (errors.length) {
        res.status(400).json({ 'error': errors.join(', ')});
        return;
    }

    var data = {
        content: req.body.content
    }
    var sql = 'INSERT INTO notes (content, createdAt) VALUES (?,?);';
    var params = [data.content, Date.now()];

    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({ 'error': err.message });
        }
        res.status(201).json({
            id: this.lastID,
            content: data.content
        })
    });
});

app.listen(4000, () => {
    console.log('Server running on port 4000')
});