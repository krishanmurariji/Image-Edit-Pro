
import { useCallback } from 'react';

export const useImageFilters = () => {
  const applyFilters = useCallback((
    ctx: CanvasRenderingContext2D,
    filters: {
      brightness: number;
      contrast: number;
      saturation: number;
      grayscale: number;
      sepia: number;
    }
  ) => {
    const filterString = [
      `brightness(${filters.brightness}%)`,
      `contrast(${filters.contrast}%)`,
      `saturate(${filters.saturation}%)`,
      `grayscale(${filters.grayscale}%)`,
      `sepia(${filters.sepia}%)`,
    ].join(' ');
    
    ctx.filter = filterString;
  }, []);

  return { applyFilters };
};
