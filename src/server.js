const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 1353;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const db = require('./db');

app.use(cors());
app.use(bodyParser.json());

// Get all forms
app.get('/api/forms', (req, res) => {
  res.json(db.getAllForms());
});

// Create new form
app.post('/api/forms', (req, res) => {
  const newForm = db.createForm(req.body);
  res.status(201).json(newForm);
});

// Get single form
app.get('/api/forms/:id', (req, res) => {
  const form = db.getForm(req.params.id);
  if (!form) {
    return res.status(404).json({ error: 'Form not found' });
  }
  res.json(form);
});

// Delete form
app.delete('/api/forms/:id', (req, res) => {
  db.deleteForm(req.params.id);
  res.status(204).end();
});

// Submit form response
app.post('/api/forms/:id/responses', (req, res) => {
  const form = db.getForm(req.params.id);
  if (!form) {
    return res.status(404).json({ error: 'Form not found' });
  }

  const response = db.createResponse(req.params.id, req.body);
  res.status(201).json(response);
});

// Get form responses
app.get('/api/forms/:id/responses', (req, res) => {
  res.json(db.getResponses(req.params.id));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
