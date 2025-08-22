import React from 'react';

export const History: React.FC = () => {
  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-3">
        <h3 className="text-lg font-medium text-gray-900">History</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-center text-gray-500">
          <div className="mb-2 text-sm">Diagram history will appear here</div>
          <div className="text-xs text-gray-400">Previous versions and saved diagrams</div>
        </div>
      </div>
    </div>
  );
};

export default History;
