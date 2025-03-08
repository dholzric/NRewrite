const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 1353;

const db = require('./db');

app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Form Routes
app.get('/api/forms', async (req, res, next) => {
  try {
    const forms = await db.getAllForms();
    res.json(forms);
  } catch (err) {
    next(err);
  }
});

app.post('/api/forms', async (req, res, next) => {
  try {
    const newForm = await db.createForm(req.body);
    res.status(201).json(newForm);
  } catch (err) {
    next(err);
  }
});

app.get('/api/forms/:id', async (req, res, next) => {
  try {
    const form = await db.getForm(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/forms/:id', async (req, res, next) => {
  try {
    await db.deleteForm(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.post('/api/forms/:id/responses', async (req, res, next) => {
  try {
    const form = await db.getForm(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    const response = await db.createResponse(req.params.id, req.body);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

app.get('/api/forms/:id/responses', async (req, res, next) => {
  try {
    const responses = await db.getResponses(req.params.id);
    res.json(responses);
  } catch (err) {
    next(err);
  }
});

// Note Routes
app.get('/api/notes', async (req, res, next) => {
  try {
    const notes = await db.getAllNotes();
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

app.post('/api/notes', async (req, res, next) => {
  try {
    const newNote = await db.createNote(req.body);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

app.get('/api/notes/:id', async (req, res, next) => {
  try {
    const note = await db.getNote(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
});

app.put('/api/notes/:id', async (req, res, next) => {
  try {
    const updatedNote = await db.updateNote(req.params.id, req.body);
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/notes/:id', async (req, res, next) => {
  try {
    await db.deleteNote(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.get('/api/notes/search/:query', async (req, res, next) => {
  try {
    const notes = await db.searchNotes(req.params.query);
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
