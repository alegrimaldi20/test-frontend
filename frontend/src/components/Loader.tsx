import React from 'react';

type LoaderStatus = 'loading' | 'error' | 'success';

interface LoaderProps {
  status: LoaderStatus;
  progress?: number;
  onCancel?: () => void;
  onRetry?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ status, progress = 0, onCancel, onRetry }) => {
  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm">
          {status === 'loading' && `Loading image ${progress}%`}
          {status === 'error' && 'Failed to upload your file'}
          {status === 'success' && (
            <span className="flex items-center gap-1">Upload successful <span>✓</span></span>
          )}
        </span>
        <span>
          {status === 'loading' && onCancel && (
            <button onClick={onCancel} className="text-sm text-black underline">
              Cancel
            </button>
          )}
          {status === 'error' && onRetry && (
            <button onClick={onRetry} className="text-sm text-black underline">
              Retry
            </button>
          )}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-150 ${
            status === 'error' ? 'bg-red-500' : 'bg-black'
          }`}
          style={{ width: status === 'success' ? '100%' : `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Loader;
