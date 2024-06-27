// components/Button.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  label: string;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ href, label, color }) => {
  return (
    <button className={`inline-flex items-center p-3 ms-2 text-sm font-medium text-white ${color} rounded-lg border ${color} hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-opacity-50`}>
      <span className="text-[#042D60] font-semibold text-lg">
        <Link href={href}>{label}</Link>
      </span>
    </button>
  );
};

export default Button;
