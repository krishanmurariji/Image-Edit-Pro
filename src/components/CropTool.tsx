
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Check } from 'lucide-react';

interface CropToolProps {
  image: string;
  onCropComplete: (croppedArea: any) => void;
  onCancel: () => void;
}

export const CropTool: React.FC<CropToolProps> = ({
  image,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = () => {
    if (croppedAreaPixels) {
      onCropComplete(croppedAreaPixels);
    }
  };

  const aspectRatios = [
    { label: 'Square (1:1)', value: 1 },
    { label: 'Widescreen (16:9)', value: 16 / 9 },
    { label: 'Standard (4:3)', value: 4 / 3 },
    { label: 'Free', value: undefined },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Crop Image</h2>
        <div className="flex items-center gap-4">
          <Select value={aspect?.toString()} onValueChange={(value) => setAspect(value === 'undefined' ? undefined : parseFloat(value))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select aspect ratio" />
            </SelectTrigger>
            <SelectContent>
              {aspectRatios.map((ratio) => (
                <SelectItem key={ratio.label} value={ratio.value?.toString() || 'undefined'}>
                  {ratio.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleCropConfirm} className="bg-green-600 hover:bg-green-700">
            <Check className="w-4 h-4 mr-2" />
            Apply Crop
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Crop Area */}
      <div className="flex-1 relative">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
            },
          }}
        />
      </div>

      {/* Footer Controls */}
      <div className="bg-white p-4 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Zoom:</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
