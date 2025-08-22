import React from 'react';

interface PanZoomToolbarProps {
  className?: string;
}

export const PanZoomToolbar: React.FC<PanZoomToolbarProps> = ({ className = '' }) => {
  return (
    <div
      className={`flex flex-col space-y-1 rounded-lg border bg-white p-2 shadow-md ${className}`}>
      <button className="rounded p-2 transition-colors hover:bg-gray-100" title="Zoom In">
        <span className="text-lg">+</span>
      </button>
      <button className="rounded p-2 transition-colors hover:bg-gray-100" title="Reset Zoom">
        <span className="text-lg">⌂</span>
      </button>
      <button className="rounded p-2 transition-colors hover:bg-gray-100" title="Zoom Out">
        <span className="text-lg">-</span>
      </button>
      <button className="rounded p-2 transition-colors hover:bg-gray-100" title="Fit to Screen">
        <span className="text-lg">□</span>
      </button>
    </div>
  );
};

export default PanZoomToolbar;
