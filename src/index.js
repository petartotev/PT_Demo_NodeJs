const express = require('express');
const app = express();

app.get('/api/todos', (req, res) => {
    res.status(200).json('message');
});

app.listen(4000, () => {
    console.log('Server running on port 4000')
});