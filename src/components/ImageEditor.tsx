
import React, { useState, useRef, useCallback } from 'react';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import { UploadArea } from './UploadArea';
import { FilterPanel } from './FilterPanel';
import { useImageHistory } from '@/hooks/useImageHistory';
import { useImageFilters } from '@/hooks/useImageFilters';

export interface ImageState {
  src: string;
  width: number;
  height: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    grayscale: number;
    sepia: number;
  };
}

export const ImageEditor = () => {
  const [image, setImage] = useState<ImageState | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { history, addToHistory, undo, redo, canUndo, canRedo } = useImageHistory(image);
  const { applyFilters } = useImageFilters();

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const newImage: ImageState = {
          src: e.target?.result as string,
          width: img.width,
          height: img.height,
          rotation: 0,
          flipX: false,
          flipY: false,
          crop: null,
          filters: {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            grayscale: 0,
            sepia: 0,
          },
        };
        setImage(newImage);
        addToHistory(newImage);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [addToHistory]);

  const updateImage = useCallback((updates: Partial<ImageState>) => {
    if (!image) return;
    const newImage = { ...image, ...updates };
    setImage(newImage);
    addToHistory(newImage);
  }, [image, addToHistory]);

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setImage(previousState);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setImage(nextState);
    }
  };

  const handleRotate = (angle: number) => {
    if (!image) return;
    updateImage({ rotation: (image.rotation + angle) % 360 });
  };

  const handleFlip = (direction: 'horizontal' | 'vertical') => {
    if (!image) return;
    if (direction === 'horizontal') {
      updateImage({ flipX: !image.flipX });
    } else {
      updateImage({ flipY: !image.flipY });
    }
  };

  const handleCrop = (aspectRatio: string) => {
    if (!image) return;
    
    let cropWidth, cropHeight;
    const imgAspect = image.width / image.height;
    
    switch (aspectRatio) {
      case '1:1':
        if (imgAspect > 1) {
          cropWidth = image.height;
          cropHeight = image.height;
        } else {
          cropWidth = image.width;
          cropHeight = image.width;
        }
        break;
      case '16:9':
        const target169 = 16 / 9;
        if (imgAspect > target169) {
          cropHeight = image.height;
          cropWidth = cropHeight * target169;
        } else {
          cropWidth = image.width;
          cropHeight = cropWidth / target169;
        }
        break;
      case '4:3':
        const target43 = 4 / 3;
        if (imgAspect > target43) {
          cropHeight = image.height;
          cropWidth = cropHeight * target43;
        } else {
          cropWidth = image.width;
          cropHeight = cropWidth / target43;
        }
        break;
      default:
        return;
    }
    
    updateImage({
      crop: {
        x: (image.width - cropWidth) / 2,
        y: (image.height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      },
    });
  };

  const handleFilterChange = (filterName: string, value: number) => {
    if (!image) return;
    updateImage({
      filters: {
        ...image.filters,
        [filterName]: value,
      },
    });
  };

  const handleDownload = (format: 'png' | 'jpeg') => {
    if (!canvasRef.current || !image) return;
    
    const link = document.createElement('a');
    link.download = `edited-image.${format}`;
    link.href = canvasRef.current.toDataURL(`image/${format}`, 0.9);
    link.click();
  };

  if (!image) {
    return <UploadArea onUpload={handleImageUpload} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Toolbar
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
        onRotate={handleRotate}
        onFlip={handleFlip}
        onCrop={handleCrop}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFilterToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        onDownload={handleDownload}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center p-6">
          <Canvas
            ref={canvasRef}
            image={image}
            selectedTool={selectedTool}
          />
        </div>
        
        {isFilterPanelOpen && (
          <FilterPanel
            filters={image.filters}
            onFilterChange={handleFilterChange}
            onClose={() => setIsFilterPanelOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
