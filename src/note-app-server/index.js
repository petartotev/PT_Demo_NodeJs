const express = require('express');
const cors = require('cors');
const db = require('./database');
const bodyParser = require('body-parser');
const ACCESS_SECRET = process.env.ACCESS_SECRET/*|| require('./secrets.json').ACCESS_SECRET*/;

const app = express();
app.use(cors());

const NoteType = ['unknown', 'beer', 'bills', 'delivery', 'family', 'health', 'hobby', 'house', 'shop', 'travel', 'work'];
const NoteStatus = ['todo', 'doing', 'on_hold', 'not_doing', 'done'];

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function validateHeader(req, res, next) {
    const myHeaderValue = req.headers['x-auth-token'];
    if (myHeaderValue !== ACCESS_SECRET) {
        return res.status(403).json({ "error": "Not Allowed" });
    }
    next();
}

function validateNoteTypeAndStatus(type, status) {
    const isValidType = NoteType.includes(type);
    const isValidStatus = NoteStatus.includes(status);
    return isValidType && isValidStatus;
}

app.get('/api/notes', validateHeader, (req, res) => {
    var sql = `SELECT * FROM notes
               WHERE IsDeleted = 0
               ORDER BY 
                   CASE WHEN deadline IS NULL THEN 1 ELSE 0 END, 
                   deadline ASC, 
                   createdAt DESC;`;
    var params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/api/notes/:id', validateHeader, (req, res) => {
    var sql = 'SELECT * FROM notes WHERE id = ? AND IsDeleted = 0';
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        else if (row === undefined) {
            return res.status(404).json({ 'error': 'Note not found' });
        }
        res.status(200).json(row);
    });
});

app.post('/api/notes', validateHeader, (req, res) => {
    const { content, type, status, deadline } = req.body;
    const errors = [];

    if (!content) errors.push('No content is supplied!');
    if (!type) errors.push('No type is supplied!');
    if (!status) errors.push('No status is supplied!');
    if (!validateNoteTypeAndStatus(type, status)) {
        errors.push('Invalid type or status.');
    }
    if (errors.length) {
        return res.status(400).json({ 'error': errors.join(', ') });
    }

    const sql = `INSERT INTO notes (content, type, status, deadline, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, NULL);`;
    const params = [content, type, status, deadline];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ 'error': err.message });
        }
        res.status(201).json({
            id: this.lastID,
            content,
            type,
            status,
            deadline
        });
    });
});

app.put('/api/notes/:id', validateHeader, (req, res) => {
    const { content, type, status, deadline } = req.body;
    if (!content || !type || !status || !validateNoteTypeAndStatus(type, status)) {
        return res.status(400).json({ 'error': 'Invalid input values' });
    }

    const sql = `UPDATE notes SET content = ?, type = ?, status = ?, deadline = ?, updatedAt = CURRENT_TIMESTAMP
                 WHERE id = ?`;
    const params = [content, type, status, deadline, req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ 'error': err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ 'error': 'Note not found' });
        } else {
            res.status(200).json({
                message: 'Note updated successfully',
                id: req.params.id,
                content,
                type,
                status,
                deadline
            });
        }
    });
});

app.patch('/api/notes/status/:id', validateHeader, (req, res) => {
    const { status } = req.body;

    if (!NoteStatus.includes(status)) {
        return res.status(400).json({ "error": `Invalid status! Must be ${NoteStatus.join(', ')}.` });
    }

    const sql = `UPDATE notes SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [status, req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        this.changes === 0
        ? res.status(404).json({ "error": "Note not found" })
        : res.status(200).json({ message: "Note status updated successfully" });
    });
});

app.patch('/api/notes/archive/:id', validateHeader, (req, res) => {
    const { isArchived } = req.body;

    if (isArchived !== 0 && isArchived !== 1) {
        return res.status(400).json({ "error": "Invalid isArchive! Must be either 0 or 1." });
    }

    const sql = `UPDATE notes SET isArchived = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [isArchived, req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        this.changes === 0
        ? res.status(404).json({ "error": "Note not found" })
        : res.status(200).json({ message: "Note isArchived updated successfully" });
    });
});

app.delete('/api/notes/:id', validateHeader, (req, res) => {
    db.run(
        'UPDATE notes SET IsDeleted = 1 WHERE id = ?',
        req.params.id,
        function(err) {
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