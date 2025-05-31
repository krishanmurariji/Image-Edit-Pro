
import React, { useRef, useEffect, forwardRef, useState } from 'react';
import { ImageState } from './ImageEditor';

interface CanvasProps {
  image: ImageState;
  selectedTool: string;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ image, selectedTool }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (!ref || typeof ref === 'function') return;
      const canvas = ref.current;
      if (!canvas || !image) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Calculate canvas size to fit container
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.clientWidth - 40;
        const containerHeight = container.clientHeight - 40;
        
        let displayWidth = image.width;
        let displayHeight = image.height;
        
        // Apply crop if exists
        if (image.crop) {
          displayWidth = image.crop.width;
          displayHeight = image.crop.height;
        }
        
        // Scale to fit container
        const scaleX = containerWidth / displayWidth;
        const scaleY = containerHeight / displayHeight;
        const scale = Math.min(scaleX, scaleY, 1);
        
        const canvasWidth = displayWidth * scale;
        const canvasHeight = displayHeight * scale;
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Apply zoom and pan
        ctx.save();
        ctx.scale(zoom, zoom);
        ctx.translate(pan.x / zoom, pan.y / zoom);
        
        // Clear canvas
        ctx.clearRect(-pan.x / zoom, -pan.y / zoom, canvasWidth / zoom, canvasHeight / zoom);
        
        // Apply transformations
        ctx.save();
        ctx.translate(canvasWidth / 2 / zoom, canvasHeight / 2 / zoom);
        
        // Apply rotation
        if (image.rotation !== 0) {
          ctx.rotate((image.rotation * Math.PI) / 180);
        }
        
        // Apply flips
        if (image.flipX || image.flipY) {
          ctx.scale(image.flipX ? -1 : 1, image.flipY ? -1 : 1);
        }
        
        // Apply filters
        const filterString = [
          `brightness(${image.filters.brightness}%)`,
          `contrast(${image.filters.contrast}%)`,
          `saturate(${image.filters.saturation}%)`,
          `grayscale(${image.filters.grayscale}%)`,
          `sepia(${image.filters.sepia}%)`,
        ].join(' ');
        
        ctx.filter = filterString;
        
        // Draw image
        if (image.crop) {
          ctx.drawImage(
            img,
            image.crop.x,
            image.crop.y,
            image.crop.width,
            image.crop.height,
            -canvasWidth / 2 / zoom,
            -canvasHeight / 2 / zoom,
            canvasWidth / zoom,
            canvasHeight / zoom
          );
        } else {
          ctx.drawImage(
            img,
            -canvasWidth / 2 / zoom,
            -canvasHeight / 2 / zoom,
            canvasWidth / zoom,
            canvasHeight / zoom
          );
        }
        
        ctx.restore();
        ctx.restore();
      };
      img.src = image.src;
    }, [image, zoom, pan, ref]);

    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom(prev => Math.max(0.1, Math.min(3, prev * delta)));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (selectedTool === 'pan' || e.button === 1) {
        setIsDragging(true);
        setLastPanPoint({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastPanPoint.x;
        const deltaY = e.clientY - lastPanPoint.y;
        setPan(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
        setLastPanPoint({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={ref}
          className="max-w-full max-h-full border border-gray-300 bg-white shadow-lg cursor-grab active:cursor-grabbing"
          style={{
            imageRendering: 'high-quality',
          }}
        />
        
        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
          {Math.round(zoom * 100)}%
        </div>
      </div>
    );
  }
);

Canvas.displayName = 'Canvas';
