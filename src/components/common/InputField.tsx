import React from 'react';

type Props = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border px-2 py-1 text-sm"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
