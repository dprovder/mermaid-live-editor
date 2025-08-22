import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Editor from '../components/Editor/Editor';
import View from '../components/View/View';
import Actions from '../components/Actions/Actions';
import Card from '../components/Card/Card';
import History from '../components/History/History';
import PanZoomToolbar from '../components/Toolbar/PanZoomToolbar';

interface Tab {
  id: string;
  title: string;
}

type EditorMode = 'code' | 'config';

export const EditPage: React.FC = () => {
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('code');
  const [shouldShowGrid, setShouldShowGrid] = useState(false);

  useEffect(() => {
    setIsMobile(width < 640);
  }, [width]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const editorTabs: Tab[] = [
    {
      id: 'code',
      title: 'Code'
    },
    {
      id: 'config',
      title: 'Config'
    }
  ];

  const handleTabSelect = (tab: Tab) => {
    setEditorMode(tab.id as EditorMode);
  };

  const MobileToggle = isMobile ? (
    <div className="flex items-center gap-2">
      <span>Edit</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isViewMode}
          onChange={() => setIsViewMode(!isViewMode)}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
      </label>
      <span>View</span>
    </div>
  ) : undefined;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Navbar mobileToggle={MobileToggle}>
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            isHistoryOpen
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          History
        </button>
        <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200">
          Share
        </button>
        <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
          Save diagram
        </button>
      </Navbar>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div
          className={`size-full ${isMobile ? 'w-[200%] duration-300' : ''} ${isMobile && isViewMode ? '-translate-x-1/2' : ''}`}>
          <div className="flex h-full gap-4 p-2 pt-0 sm:gap-0 sm:p-6 sm:pt-0">
            {/* Editor Pane */}
            <div
              className="flex h-full flex-col gap-4 sm:gap-6"
              style={{ flex: '0 0 30%', minWidth: '15%' }}>
              <Card
                tabs={editorTabs}
                activeTabID={editorMode}
                onSelect={handleTabSelect}
                isOpen
                isClosable={false}
                actions={
                  <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200">
                    Docs
                  </button>
                }>
                <Editor isMobile={isMobile} mode={editorMode} />
              </Card>

              <div className="flex flex-wrap justify-between gap-4 sm:gap-6">
                <div className="text-sm text-gray-500">Preset controls placeholder</div>
                <Actions />
              </div>
            </div>

            {/* Resizer (hidden on mobile) */}
            {!isMobile && (
              <div className="mx-2 w-1 cursor-col-resize bg-gray-200 transition-colors hover:bg-gray-300"></div>
            )}

            {/* View Pane */}
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

              <div className="absolute bottom-0 left-0 p-2 sm:left-5">
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
                  <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200">
                    Rough
                  </button>
                </div>
              </div>
            </div>

            {/* History Pane */}
            {isHistoryOpen && !isMobile && (
              <>
                <div className="mx-2 w-1 cursor-col-resize bg-gray-200 transition-colors hover:bg-gray-300"></div>
                <div
                  className="h-full flex-grow flex-col"
                  style={{ flex: '0 0 30%', minWidth: '15%' }}>
                  <History />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
