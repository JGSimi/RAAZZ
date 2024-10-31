import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImageViewer = ({ imageUrl, onClose }) => {
  // Previne scroll quando o viewer está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full
            hover:bg-black/70 transition-all duration-300 z-50"
        >
          <FaTimes className="text-xl" />
        </button>
        
        <img
          src={imageUrl}
          alt="Full screen"
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg
            shadow-2xl cursor-zoom-out"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ImageViewer; 