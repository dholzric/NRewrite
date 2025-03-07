import React, { useState, useEffect } from 'react';
import { Plus, Filter, Copy, Layout } from 'lucide-react';

// Mock data structure
const initialDocuments = [
  { id: 1, title: 'Project A', status: 'Active', owner: 'John', lastModified: '2025-02-06' },
  { id: 2, title: 'Meeting Notes', status: 'Draft', owner: 'Sarah', lastModified: '2025-02-05' },
];

const ModernNotesApp = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [activeView, setActiveView] = useState('all');
  const [showFormDesigner, setShowFormDesigner] = useState(false);
  const [formTemplates, setFormTemplates] = useState([
    { id: 'contact', name: 'Contact Form', fields: [] },
    { id: 'project', name: 'Project Details', fields: [] }
  ]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    field: 'status',
    value: ''
  });
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // View definitions
  const views = {
    all: {
      name: 'All Documents',
      filter: () => true
    },
    active: {
      name: 'Active Projects',
      filter: doc => doc.status === 'Active'
    },
    draft: {
      name: 'Draft Documents',
      filter: doc => doc.status === 'Draft'
    }
  };

  const handleDocumentSelect = (docId) => {
    setSelectedDocs(prev => {
      if (prev.includes(docId)) {
        return prev.filter(id => id !== docId);
      }
      return [...prev, docId];
    });
  };

  const handleCopyDocuments = () => {
    const copiedDocs = selectedDocs.map(id => {
      const original = documents.find(doc => doc.id === id);
      return {
        ...original,
        id: Math.max(...documents.map(d => d.id)) + 1,
        title: `Copy of ${original.title}`,
        lastModified: new Date().toISOString().split('T')[0]
      };
    });
    setDocuments(prev => [...prev, ...copiedDocs]);
    setSelectedDocs([]);
  };

  const filteredDocuments = documents.filter(views[activeView].filter);

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Modern Notes</h2>
          <p className="text-sm text-gray-500 mt-1">Document Management System</p>
        </div>
        
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <div className="relative">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Plus className="mr-2 h-4 w-4" />
                New Document
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {formTemplates.map(template => (
                  <button
                    key={template.id}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setShowFormDesigner(true)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Layout className="mr-2 h-4 w-4" />
              Form Designer
            </button>
            <button 
              className={`flex items-center px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selectedDocs.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={selectedDocs.length === 0}
              onClick={handleCopyDocuments}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Selected
            </button>
          </div>

          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-4" aria-label="Views">
              {Object.entries(views).map(([key, view]) => (
                <button
                  key={key}
                  onClick={() => setActiveView(key)}
                  className={`px-3 py-2 text-sm font-medium border-b-2 ${
                    activeView === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {view.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {filterCriteria.field || 'Filter by'}
              </button>
              {isFilterDropdownOpen && (
                <div className="absolute mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={() => {
                      setFilterCriteria(prev => ({ ...prev, field: 'status' }));
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => {
                      setFilterCriteria(prev => ({ ...prev, field: 'owner' }));
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Owner
                  </button>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Filter value"
              value={filterCriteria.value}
              onChange={(e) => setFilterCriteria(prev => ({ ...prev, value: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
            />
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-8 px-3 py-3"></th>
                  <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.id)}
                        onChange={() => handleDocumentSelect(doc.id)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900">{doc.title}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{doc.status}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{doc.owner}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{doc.lastModified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernNotesApp;