import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  options,
  value,
  onChange,
  
}) => {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-surface-border text-surface-strong text-sm rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};