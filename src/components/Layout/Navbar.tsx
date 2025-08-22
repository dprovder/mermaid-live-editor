import React from 'react';

interface NavbarProps {
  children?: React.ReactNode;
  mobileToggle?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children, mobileToggle }) => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900">Mermaid Live Editor</h1>
        {mobileToggle}
      </div>

      <div className="flex items-center space-x-2">{children}</div>
    </nav>
  );
};

export default Navbar;
