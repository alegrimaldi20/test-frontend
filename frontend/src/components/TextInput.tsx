import React, { useState } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  buttonLabel,
  onButtonClick,
  placeholder,
  disabled,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value);

  const borderClass = error
    ? 'border-red-500'
    : focused
    ? 'border-black'
    : 'border-gray-300';

  return (
    <div className="w-full">
      <div className={`flex items-stretch border rounded overflow-hidden ${borderClass} ${disabled ? 'opacity-50' : ''}`}>
        <div className="relative flex-1">
          {/* Floating label */}
          {label && (focused || hasValue) && (
            <span className="absolute top-1 left-3 text-[10px] text-gray-500">{label}</span>
          )}
          <input
            placeholder={focused ? '' : placeholder}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full px-3 text-sm bg-white focus:outline-none ${
              label && (focused || hasValue) ? 'pt-5 pb-1' : 'py-3'
            }`}
            {...props}
          />
        </div>

        {/* Inline button */}
        {buttonLabel && (
          <button
            onClick={onButtonClick}
            disabled={disabled}
            className="px-5 bg-black text-white text-sm font-semibold whitespace-nowrap hover:bg-black/80 disabled:opacity-50"
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Error text */}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
