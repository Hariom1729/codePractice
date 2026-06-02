'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  let variantClasses = '';
  
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-[var(--color-bg-glass)] text-[var(--color-neon-cyan)] border border-[var(--color-neon-cyan)] hover:glow-cyan hover:bg-[var(--color-neon-cyan)] hover:text-black';
      break;
    case 'secondary':
      variantClasses = 'bg-[var(--color-bg-glass)] text-[var(--color-neon-purple)] border border-[var(--color-neon-purple)] hover:glow-purple hover:bg-[var(--color-neon-purple)] hover:text-white';
      break;
    case 'danger':
      variantClasses = 'bg-[var(--color-bg-glass)] text-[var(--color-neon-red)] border border-[var(--color-neon-red)] hover:glow-red hover:bg-[var(--color-neon-red)] hover:text-white';
      break;
    case 'ghost':
      variantClasses = 'text-gray-300 hover:text-[var(--color-neon-cyan)] hover:glow-text-cyan border border-transparent';
      break;
  }

  return (
    <button 
      className={`px-6 py-2 rounded-md font-medium tracking-wide transition-all duration-300 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
