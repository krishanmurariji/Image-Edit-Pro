
import { useState, useCallback } from 'react';
import { ImageState } from '@/components/ImageEditor';

export const useImageHistory = (initialState: ImageState | null) => {
  const [history, setHistory] = useState<ImageState[]>(initialState ? [initialState] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToHistory = useCallback((state: ImageState) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(state);
      return newHistory;
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    history,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
