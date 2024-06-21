import React from 'react';

interface TabsProps {
  tabs: Array<string>;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTab, onSelectTab }) => (
  <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap mt-20">
    {tabs.map(tab => (
      <a
        key={tab}
        onClick={() => onSelectTab(tab)}
        className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-600 dark:text-gray-600 ${
          selectedTab === tab ? 'border dark:border-gray-600 dark:text-gray-900' : ''
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>{tab}</span>
      </a>
    ))}
  </div>
);

export default Tabs;
