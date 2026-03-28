import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'black' | 'green-outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#D4E157] text-black border-transparent ' +
    'hover:bg-black hover:text-white ' +
    'focus:bg-[#D4E157] focus:outline focus:outline-2 focus:outline-[#D4E157] focus:outline-offset-2 ' +
    'active:bg-[#4A148C] active:text-white ' +
    'disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed',

  secondary:
    'bg-transparent text-black border border-[#D4E157] ' +
    'hover:bg-[#D4E157] hover:text-black ' +
    'focus:bg-transparent focus:outline focus:outline-2 focus:outline-[#D4E157] focus:outline-offset-2 ' +
    'active:bg-[#D4E157] active:text-black ' +
    'disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed',

  black:
    'bg-black text-white border-transparent ' +
    'hover:bg-[#D4E157] hover:text-black ' +
    'focus:bg-black focus:outline focus:outline-2 focus:outline-[#D4E157] focus:outline-offset-2 ' +
    'active:bg-[#D4E157] active:text-black ' +
    'disabled:bg-transparent disabled:text-gray-400 disabled:cursor-not-allowed',

  'green-outline':
    'bg-[#D4E157] text-black border border-black ' +
    'hover:bg-black hover:text-white hover:border-black ' +
    'focus:bg-black focus:text-white focus:outline focus:outline-2 focus:outline-black focus:outline-offset-2 ' +
    'active:bg-black active:text-white ' +
    'disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 font-semibold text-sm rounded transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
