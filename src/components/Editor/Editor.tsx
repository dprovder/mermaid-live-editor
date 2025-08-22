import React from 'react';

interface EditorProps {
  isMobile?: boolean;
  mode?: 'code' | 'config';
}

export const Editor: React.FC<EditorProps> = ({ isMobile = false, mode = 'code' }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 rounded border border-gray-300 bg-gray-50">
        <div className="h-full p-4 font-mono text-sm">
          <div className="mb-2 text-gray-500">Monaco Editor will be integrated here</div>
          <div className="text-gray-400">
            Mode: {mode} | Mobile: {isMobile ? 'Yes' : 'No'}
          </div>
          <div className="mt-4 text-xs text-gray-400">
            Placeholder for Monaco-based Mermaid code editor
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
