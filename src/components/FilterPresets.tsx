
import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterPreset {
  name: string;
  icon: string;
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    grayscale: number;
    sepia: number;
  };
}

interface FilterPresetsProps {
  onPresetApply: (filters: FilterPreset['filters']) => void;
  onReset: () => void;
}

export const FilterPresets: React.FC<FilterPresetsProps> = ({
  onPresetApply,
  onReset,
}) => {
  const presets: FilterPreset[] = [
    {
      name: 'Original',
      icon: '🌟',
      filters: { brightness: 100, contrast: 100, saturation: 100, grayscale: 0, sepia: 0 },
    },
    {
      name: 'Vintage',
      icon: '📷',
      filters: { brightness: 110, contrast: 90, saturation: 70, grayscale: 0, sepia: 40 },
    },
    {
      name: 'Cinematic',
      icon: '🎬',
      filters: { brightness: 95, contrast: 130, saturation: 85, grayscale: 0, sepia: 0 },
    },
    {
      name: 'B&W',
      icon: '⚫',
      filters: { brightness: 100, contrast: 110, saturation: 0, grayscale: 100, sepia: 0 },
    },
    {
      name: 'Warm',
      icon: '🔥',
      filters: { brightness: 115, contrast: 105, saturation: 110, grayscale: 0, sepia: 25 },
    },
    {
      name: 'Cool',
      icon: '❄️',
      filters: { brightness: 100, contrast: 120, saturation: 90, grayscale: 0, sepia: 0 },
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Filter Presets</h3>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => onPresetApply(preset.filters)}
            className="flex flex-col items-center p-3 h-auto gap-1 hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg">{preset.icon}</span>
            <span className="text-xs">{preset.name}</span>
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="w-full"
      >
        Reset All Filters
      </Button>
    </div>
  );
};
