import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import View from '../components/View/View';
import PanZoomToolbar from '../components/Toolbar/PanZoomToolbar';

export const ViewPage: React.FC = () => {
  const [shouldShowGrid, setShouldShowGrid] = useState(false);

  useEffect(() => {
    // Initialize view-only mode logic here
    // Handle URL parameter parsing for shared diagrams
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Navbar>
        <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200">
          Share
        </button>
        <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
          Edit
        </button>
      </Navbar>

      <div className="flex flex-1 flex-col overflow-hidden p-6">
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <View shouldShowGrid={shouldShowGrid} className="flex-1" />

          {/* Floating Toolbars */}
          <div className="absolute right-0 top-0">
            <PanZoomToolbar />
          </div>

          <div className="absolute bottom-0 right-0 p-2">
            <div className="rounded bg-white px-2 py-1 text-xs text-gray-500 shadow">
              Version & Security
            </div>
          </div>

          <div className="absolute bottom-0 left-0 p-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShouldShowGrid(!shouldShowGrid)}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  shouldShowGrid
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
