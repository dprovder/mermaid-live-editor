import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components';
import { HomePage, EditPage, ViewPage } from './pages';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/*" element={<EditPage />} />
        <Route path="/view/*" element={<ViewPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
