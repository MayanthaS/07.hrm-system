import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-caption font-semibold text-secondary">{label}</label>}
      <input className={`border border-slate-300 rounded px-3 py-2 text-body focus:outline-none focus:border-primary ${className}`} {...props} />
    </div>
  );
};