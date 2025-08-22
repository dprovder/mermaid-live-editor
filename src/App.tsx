import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Placeholder components for now - these will be implemented by other agents
const HomePage = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Mermaid Live Editor
      </h1>
      <p className="text-lg text-gray-600">
        React + Vite + TypeScript foundation is ready!
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Environment variables with MERMAID_ prefix: {Object.keys(import.meta.env).filter(key => key.startsWith('MERMAID_')).length} found
      </p>
    </div>
  </div>
);

const EditPage = () => (
  <div className="flex h-screen items-center justify-center">
    <h2 className="text-2xl font-bold">Edit Mode - Coming Soon</h2>
  </div>
);

const ViewPage = () => (
  <div className="flex h-screen items-center justify-center">
    <h2 className="text-2xl font-bold">View Mode - Coming Soon</h2>
  </div>
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/*" element={<EditPage />} />
        <Route path="/view/*" element={<ViewPage />} />
      </Routes>
    </div>
  );
}

export default App;