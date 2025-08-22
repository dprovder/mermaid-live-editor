import React, { useEffect, useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isLoading] = useState(false);
  const [loadingMessage] = useState('');

  useEffect(() => {
    // Service worker registration logic will be implemented later
    // Hash change handling logic will be implemented later
  }, []);

  return (
    <div className="h-[100dvh]">
      <main className="h-full">{children}</main>

      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen justify-center bg-gray-600 align-middle opacity-50">
          <div className="my-auto text-4xl font-bold text-indigo-100">
            <div className="loader mx-auto"></div>
            <div>{loadingMessage}</div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .loader {
            border: 0.45em solid #f3f3f3;
            border-radius: 50%;
            border-top: 0.45em solid #6365f1;
            width: 3em;
            height: 3em;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
          }

          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
        }}
      />
    </div>
  );
};

export default MainLayout;
