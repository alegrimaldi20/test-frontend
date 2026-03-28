import React, { useState, useRef } from 'react';
import Button from './Button';
import Loader from './Loader';

type ModalState = 'form' | 'loading' | 'success' | 'error';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [modalState, setModalState] = useState<ModalState>('form');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    if (!title.trim() || !image) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    setModalState('loading');
    setProgress(0);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setProgress(100);
        setModalState('success');
      } else {
        setModalState('error');
      }
    });

    xhr.addEventListener('error', () => setModalState('error'));

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    xhr.open('POST', `${backendUrl}/api/post/related`);
    xhr.send(formData);
  };

  const handleDone = () => {
    onSuccess?.();
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setImage(null);
    setProgress(0);
    setModalState('form');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="relative w-[90vw] max-w-[420px] p-6 sm:p-10 rounded"
        style={{ backgroundColor: '#D4E157', boxShadow: '6px 6px 0px #000' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-black text-2xl font-light leading-none"
        >
          ×
        </button>

        {/* FORM STATE */}
        {modalState === 'form' && (
          <>
            <h2 className="text-2xl font-bold text-center text-black mb-2">Upload your post</h2>
            <p className="text-center text-sm text-black/60 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
            </p>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded mb-4 bg-white text-sm focus:outline-none"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <Button
              variant="green-outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 mb-4"
            >
              {image ? image.name : 'Upload Image'} ↑
            </Button>
            <Button
              variant="black"
              onClick={handleConfirm}
              disabled={!title.trim() || !image}
              className="w-full"
            >
              Confirm
            </Button>
          </>
        )}

        {/* LOADING STATE */}
        {modalState === 'loading' && (
          <>
            <h2 className="text-2xl font-bold text-center text-black mb-2">Upload your post</h2>
            <p className="text-center text-sm text-black/60 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
            </p>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              disabled
              className="w-full px-3 py-3 border border-gray-300 rounded mb-4 bg-white text-sm focus:outline-none opacity-70"
            />
            <div className="mb-4">
              <Loader status="loading" progress={progress} onCancel={handleClose} />
            </div>
            <Button variant="black" disabled className="w-full">
              Confirm
            </Button>
          </>
        )}

        {/* ERROR STATE */}
        {modalState === 'error' && (
          <div className="flex flex-col items-center justify-center py-6">
            <h2 className="text-2xl font-bold text-center text-black mb-4">Upload failed</h2>
            <p className="text-center text-sm text-black/60 mb-8">
              There was an error uploading your post. Please try again.
            </p>
            <Button variant="black" onClick={() => setModalState('form')} className="px-14">
              Retry
            </Button>
          </div>
        )}

        {/* SUCCESS STATE */}
        {modalState === 'success' && (
          <div className="flex flex-col items-center justify-center py-6">
            <h2 className="text-2xl font-bold text-center text-black mb-10">
              Your post was successfully uploaded!
            </h2>
            <Button variant="black" onClick={handleDone} className="px-14">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPostModal;
