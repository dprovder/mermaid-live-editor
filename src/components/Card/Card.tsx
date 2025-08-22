import React, { useState } from 'react';

interface Tab {
  id: string;
  title: string;
  icon?: React.ComponentType;
}

interface CardProps {
  tabs?: Tab[];
  activeTabID?: string;
  onSelect?: (tab: Tab) => void;
  isOpen?: boolean;
  isClosable?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  tabs = [],
  activeTabID,
  onSelect,
  isOpen = true,
  isClosable = true,
  actions,
  children
}) => {
  const [isCardOpen, setIsCardOpen] = useState(isOpen);

  const handleTabClick = (tab: Tab) => {
    if (onSelect) {
      onSelect(tab);
    }
  };

  const handleToggle = () => {
    if (isClosable) {
      setIsCardOpen(!isCardOpen);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-3">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                activeTabID === tab.id
                  ? 'border border-blue-200 bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              {tab.icon && <tab.icon />}
              {tab.title}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {actions}
          {isClosable && (
            <button onClick={handleToggle} className="text-gray-400 hover:text-gray-600">
              {isCardOpen ? '−' : '+'}
            </button>
          )}
        </div>
      </div>

      {isCardOpen && <div className="flex-1 p-3">{children}</div>}
    </div>
  );
};

export default Card;
