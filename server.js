const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001; // Ensure this port is free or change it as needed

let annotations = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-annotation', (req, res) => {
    console.log('Annotation Received:', req.body);
    annotations.push(req.body);
    res.status(200).send('Annotation received successfully');
});

app.get('/annotations', (req, res) => {
    let html = '<h1>Received Annotations</h1>';
    html += '<pre>' + JSON.stringify(annotations, null, 2) + '</pre>';
    res.send(html);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


