import React from 'react';

interface TableProps {
  title: string;
  data: Array<any>;
  headers: Array<string>;
}

const Table: React.FC<TableProps> = ({ title, data, headers }) => (
  <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
    <h2 className="mb-4 text-2xl font-semibold leading-tight">{title}</h2>
    <div className="overflow-x-auto">
      <table className="w-full p-6 text-xs text-left whitespace-nowrap">
        <thead>
          <tr className="dark:bg-gray-300">
            {headers.map(header => (
              <th key={header} className="p-3">{header}</th>
            ))}
            <th className="p-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header} className="px-3 py-2">{row[header]}</td>
              ))}
              <td className="px-3 py-2">
                <button type="button" title="Open details" className="p-1 rounded-full dark:text-gray-400 hover:dark:bg-gray-300 focus:dark:bg-gray-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
