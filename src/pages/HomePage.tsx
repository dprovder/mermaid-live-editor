import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle old live editor links and redirect to new version
    // This mirrors the Svelte +page.svelte redirect logic
    const hash = window.location.hash.split('/');
    let newURL = '/edit';

    if (hash.length > 2) {
      newURL = `/${hash[1]}#${hash[2]}`;
    }

    // Redirect to edit page by default
    navigate(newURL, { replace: true });
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Mermaid Live Editor</h1>
        <p className="text-lg text-gray-600">Redirecting to editor...</p>
      </div>
    </div>
  );
};

export default HomePage;
