import React from 'react';

type Option = { label: string; value: string };

type Props = {
  label: string;
  options: Option[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ label, options, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-600">{label}</label>
      <select {...props} className="w-full border px-2 py-1 text-sm">
        <option value="">Select</option>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
