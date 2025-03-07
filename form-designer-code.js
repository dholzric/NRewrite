import React, { useState } from 'react';

const FormDesigner = ({ onSave, onCancel, existingTemplate = null }) => {
  const [formName, setFormName] = useState(existingTemplate?.name || '');
  const [fields, setFields] = useState(existingTemplate?.fields || []);
  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showFieldPanel, setShowFieldPanel] = useState(false);

  const fieldTypes = [
    { id: 'text', label: 'Text Field', icon: '✏️' },
    { id: 'number', label: 'Number', icon: '🔢' },
    { id: 'date', label: 'Date', icon: '📅' },
    { id: 'select', label: 'Dropdown', icon: '▼' },
    { id: 'rich-text', label: 'Rich Text', icon: '📝' },
    { id: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { id: 'radio', label: 'Radio Group', icon: '⭕' }
  ];

  const addField = (type) => {
    const newField = {
      id: `field_${Date.now()}`,
      type: type,
      label: `New ${type} Field`,
      required: false,
      options: type === 'select' || type === 'radio' ? [] : undefined,
      defaultValue: '',
      width: 'full', // full, 1/2, 1/3
      validation: {}
    };
    setFields([...fields, newField]);
    setActiveField(newField);
  };

  const updateField = (fieldId, updates) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (fieldId) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (activeField?.id === fieldId) {
      setActiveField(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Field Types */}
      <div className="w-48 bg-white border-r border-gray-200 p-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Add Fields</h2>
        <div className="space-y-2">
          {fieldTypes.map(type => (
            <button
              key={type.id}
              onClick={() => addField(type.id)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Form Layout */}
      <div className="flex-1 flex flex-col">
        {/* Form Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex-1">
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter form name"
              className="text-xl font-semibold px-2 py-1 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                if (!formName.trim()) {
                  alert('Please enter a form name');
                  return;
                }
                if (fields.length === 0) {
                  alert('Please add at least one field');
                  return;
                }
                setIsSaving(true);
                try {
                  await onSave({
                    id: existingTemplate?.id || `form_${Date.now()}`,
                    name: formName.trim(),
                    fields: fields
                  });
                } catch (error) {
                  console.error('Error saving form:', error);
                  alert('Error saving form');
                }
                setIsSaving(false);
              }}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md ${
                isSaving
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Form'}
            </button>
          </div>
        </div>

        {/* Form Canvas */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
            {fields.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Add fields from the left sidebar to start building your form
              </div>
            ) : (
              <div className="space-y-6">
                {fields.map((field, index) => {
                  const moveField = (direction) => {
                    const newIndex = direction === 'up' ? index - 1 : index + 1;
                    if (newIndex >= 0 && newIndex < fields.length) {
                      const newFields = [...fields];
                      [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
                      setFields(newFields);
                    }
                  };
                  
                  return (
                    <div
                      key={field.id}
                      className={`border rounded-lg p-4 ${
                        activeField?.id === field.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'
                      }`}
                      onClick={() => setActiveField(field)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          className="font-medium text-gray-700 px-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                        />
                        <div className="flex items-center space-x-2">
                          {index > 0 && (
                            <button
                              onClick={() => moveField('up')}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ↑
                            </button>
                          )}
                          {index < fields.length - 1 && (
                            <button
                              onClick={() => moveField('down')}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ↓
                            </button>
                          )}
                          <button
                            onClick={() => deleteField(field.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      
                      {/* Field Preview */}
                      <div className="mt-2">
                        {field.type === 'text' && (
                          <input
                            type="text"
                            placeholder="Text input"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            disabled
                          />
                        )}
                        {field.type === 'number' && (
                          <input
                            type="number"
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            disabled
                          />
                        )}
                        {field.type === 'date' && (
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            disabled
                          />
                        )}
                        {field.type === 'select' && (
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            disabled
                          >
                            <option>Select an option</option>
                          </select>
                        )}
                        {field.type === 'rich-text' && (
                          <div className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            Rich text editor
                          </div>
                        )}
                        {field.type === 'checkbox' && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              disabled
                            />
                            <span className="ml-2 text-gray-600">Checkbox option</span>
                          </div>
                        )}
                        {field.type === 'radio' && (
                          <div className="flex items-center">
                            <input
                              type="radio"
                              className="h-4 w-4 border-gray-300"
                              disabled
                            />
                            <span className="ml-2 text-gray-600">Radio option</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Field Properties */}
      {activeField && (
        <div className="w-64 bg-white border-l border-gray-200 p-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">Field Properties</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Width
              </label>
              <select
                value={activeField.width}
                onChange={(e) => updateField(activeField.id, { width: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="full">Full width</option>
                <option value="1/2">Half width</option>
                <option value="1/3">One third</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={activeField.required}
                onChange={(e) => updateField(activeField.id, { required: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label className="ml-2 text-sm text-gray-700">Required field</label>
            </div>

            {(activeField.type === 'select' || activeField.type === 'radio') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                <div className="space-y-2">
                  {(activeField.options || []).map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...activeField.options];
                          newOptions[index] = e.target.value;
                          updateField(activeField.id, { options: newOptions });
                        }}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => {
                          const newOptions = activeField.options.filter((_, i) => i !== index);
                          updateField(activeField.id, { options: newOptions });
                        }}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newOptions = [...(activeField.options || []), ''];
                      updateField(activeField.id, { options: newOptions });
                    }}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    + Add option
                  </button>
                </div>
              </div>
            )}

            {activeField.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Validation
                </label>
                <select
                  value={activeField.validation.type || ''}
                  onChange={(e) => updateField(activeField.id, {
                    validation: { ...activeField.validation, type: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">None</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="url">URL</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDesigner;