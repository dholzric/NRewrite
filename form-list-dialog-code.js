import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const FormListDialog = ({ forms = [], onEdit, onDelete, onClose }) => {
  if (!Array.isArray(forms)) {
    console.error('Forms prop must be an array');
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Form Templates</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4">
          {forms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No form templates available
            </div>
          ) : (
            <div className="space-y-2">
              {forms.map(form => (
                <div
                  key={form?.id || 'unknown'}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{form?.name || 'Untitled Form'}</h3>
                    <p className="text-sm text-gray-500">
                      {form?.fields?.length || 0} fields
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(form)}
                      className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (form?.id && onDelete && confirm('Are you sure you want to delete this form template?')) {
                          onDelete(form.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormListDialog;