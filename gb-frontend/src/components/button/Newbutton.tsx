import React from 'react';

interface NewButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const NewButton: React.FC<NewButtonProps> = ({ 
  text, 
  onClick,
  icon 
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-brand-primary hover:bg-brand-primaryDark text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
    >
      {icon || (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )}
      {text}
    </button>
  );
};