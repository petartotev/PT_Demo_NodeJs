const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function validateHeader(req, res, next) {
    const myHeaderValue = req.headers['x-auth-token'];
    console.log(myHeaderValue);
    if (myHeaderValue !== 'ThisIsASuperSecretToken123') {
        console.log('wrong');
        return res.status(403).json({ "error": "Not Allowed" });
    }
    console.log('correct');
    next();
}

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

app.get('/api/notes/:id', (req, res) => {
    var sql = 'SELECT * FROM notes WHERE id = ?';
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

app.post('/api/notes', validateHeader, (req, res) => {
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

app.put('/api/notes/:id', validateHeader, (req, res) => {
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ 'error': 'Content is required' });
        return;
    }
    
    const sql = 'UPDATE notes SET content = ?, createdAt = ? WHERE id = ?';
    const params = [content, new Date().toISOString(), req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ 'error': err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ 'error': 'Note not found' });
        } else {
            res.status(200).json({
                message: 'Note updated successfully',
                id: req.params.id,
                content: content
            });
        }
    });
});

app.patch('/api/notes/:id', validateHeader, (req, res) => {
    var data = {
        content: req.body.content,
        createdAt: Date.now() // Optionally update the createdAt or add another field for updatedAt
    };
    db.run(
        `UPDATE notes set 
           content = COALESCE(?,content), 
           createdAt = COALESCE(?,createdAt) 
           WHERE id = ?`,
        [data.content, data.createdAt, req.params.id],
        function(err, result) {
            if (err) {
                res.status(400).json({"error": res.message});
                return;
            }
            res.status(200).json({ message: "success", data: data, changes: this.changes });
    });
});

app.delete('/api/notes/:id', validateHeader, (req, res) => {
    db.run(
        'DELETE FROM notes WHERE id = ?',
        req.params.id,
        function(err, result) {
            if (err){
                res.status(400).json({"error": err.message});
                return;
            }
            res.status(200).json({"message":"deleted", changes: this.changes});
    });
});

app.listen(4000, () => {
    console.log('Server running on port 4000')
});