import React from 'react';

interface ViewProps {
  shouldShowGrid?: boolean;
  className?: string;
}

export const View: React.FC<ViewProps> = ({ shouldShowGrid = false, className = '' }) => {
  return (
    <div className={`flex h-full flex-col overflow-hidden ${className}`}>
      <div className="relative flex-1 rounded border border-gray-300 bg-white">
        {shouldShowGrid && <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>}
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="mb-2 text-lg font-medium">Mermaid Diagram Preview</div>
            <div className="text-sm">Live diagram rendering will appear here</div>
            <div className="mt-2 text-xs text-gray-400">
              Grid: {shouldShowGrid ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
