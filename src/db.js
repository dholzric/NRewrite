const { v4: uuidv4 } = require('uuid');

class InMemoryDB {
  constructor() {
    this.forms = new Map();
    this.responses = new Map();
  }

  createForm(formData) {
    const id = uuidv4();
    const form = {
      id,
      ...formData,
      createdAt: new Date().toISOString()
    };
    this.forms.set(id, form);
    return form;
  }

  getForm(id) {
    return this.forms.get(id);
  }

  getAllForms() {
    return Array.from(this.forms.values());
  }

  deleteForm(id) {
    this.forms.delete(id);
    this.responses.delete(id);
  }

  createResponse(formId, responseData) {
    const id = uuidv4();
    const response = {
      id,
      formId,
      data: responseData,
      submittedAt: new Date().toISOString()
    };
    
    if (!this.responses.has(formId)) {
      this.responses.set(formId, new Map());
    }
    this.responses.get(formId).set(id, response);
    return response;
  }

  getResponses(formId) {
    return this.responses.has(formId) 
      ? Array.from(this.responses.get(formId).values())
      : [];
  }
}

module.exports = new InMemoryDB();
