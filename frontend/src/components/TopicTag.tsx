import React from 'react';

interface TopicTagProps {
  label: string;
  selected?: boolean;
  onRemove?: () => void;
}

const TopicTag: React.FC<TopicTagProps> = ({ label, selected = false, onRemove }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border transition-colors ${
        selected
          ? 'bg-[#D4E157] border-[#D4E157] text-black font-medium'
          : 'bg-white border-gray-400 text-black'
      }`}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-black/60 hover:text-black leading-none"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default TopicTag;
