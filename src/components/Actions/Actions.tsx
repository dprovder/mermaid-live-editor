import React from 'react';

export const Actions: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600">
        Download PNG
      </button>
      <button className="rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-600">
        Download SVG
      </button>
      <button className="rounded bg-purple-500 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-600">
        Copy URL
      </button>
      <button className="rounded bg-gray-500 px-3 py-1 text-sm text-white transition-colors hover:bg-gray-600">
        More Actions
      </button>
    </div>
  );
};

export default Actions;
