import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'secondary';
};

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const base = 'px-3 py-1 rounded text-sm disabled:opacity-50 ' +
    'focus:outline-none focus:ring-0 active:outline-none ';
  const variants = {
    primary: 'bg-blue-600 text-white',
    danger: 'bg-red-600 text-white',
    secondary: 'border',
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}
