
import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadAreaProps {
  onUpload: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onUpload }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      onUpload(imageFile);
    }
  }, [onUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className="max-w-md w-full mx-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload an image</h3>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop an image here, or click to browse
        </p>
        <p className="text-xs text-gray-400">
          Supports PNG, JPG, GIF up to 10MB
        </p>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  );
};
