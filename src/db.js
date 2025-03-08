const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB with fallback
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB at', process.env.MONGO_URI);
  } catch (primaryError) {
    console.warn('Primary MongoDB connection failed, trying local instance...');
    try {
      await mongoose.connect('mongodb://localhost:27017/notes-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to local MongoDB instance');
    } catch (localError) {
      console.error('Failed to connect to MongoDB:', localError);
      process.exit(1);
    }
  }
};

connectDB();

// Form Schema
const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  fields: [{
    label: String,
    type: String,
    required: Boolean
  }],
  createdAt: { type: Date, default: Date.now }
});

// Note Schema
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Response Schema
const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  data: mongoose.Schema.Types.Mixed,
  submittedAt: { type: Date, default: Date.now }
});

// Models
const Form = mongoose.model('Form', formSchema);
const Note = mongoose.model('Note', noteSchema);
const Response = mongoose.model('Response', responseSchema);

// Database API
class Database {
  // Form Methods
  async createForm(formData) {
    const form = new Form(formData);
    return await form.save();
  }

  async getForm(id) {
    return await Form.findById(id);
  }

  async getAllForms() {
    return await Form.find({});
  }

  async deleteForm(id) {
    await Form.findByIdAndDelete(id);
    await Response.deleteMany({ formId: id });
  }

  // Response Methods
  async createResponse(formId, responseData) {
    const response = new Response({
      formId,
      data: responseData
    });
    return await response.save();
  }

  async getResponses(formId) {
    return await Response.find({ formId });
  }

  // Note Methods
  async createNote(noteData) {
    const note = new Note(noteData);
    return await note.save();
  }

  async getNote(id) {
    return await Note.findById(id);
  }

  async getAllNotes() {
    return await Note.find({}).sort({ createdAt: -1 });
  }

  async updateNote(id, updateData) {
    updateData.updatedAt = Date.now();
    return await Note.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteNote(id) {
    return await Note.findByIdAndDelete(id);
  }

  async searchNotes(query) {
    return await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    });
  }
}

module.exports = new Database();
