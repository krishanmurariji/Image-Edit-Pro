
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    grayscale: number;
    sepia: number;
  };
  onFilterChange: (filterName: string, value: number) => void;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClose,
}) => {
  const filterConfig = [
    { name: 'brightness', label: 'Brightness', min: 0, max: 200, step: 1 },
    { name: 'contrast', label: 'Contrast', min: 0, max: 200, step: 1 },
    { name: 'saturation', label: 'Saturation', min: 0, max: 200, step: 1 },
    { name: 'grayscale', label: 'Grayscale', min: 0, max: 100, step: 1 },
    { name: 'sepia', label: 'Sepia', min: 0, max: 100, step: 1 },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters & Adjustments</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {filterConfig.map(({ name, label, min, max, step }) => (
          <div key={name} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <span className="text-sm text-gray-500">
                {name === 'brightness' || name === 'contrast' || name === 'saturation'
                  ? `${filters[name as keyof typeof filters]}%`
                  : `${filters[name as keyof typeof filters]}%`}
              </span>
            </div>
            <Slider
              value={[filters[name as keyof typeof filters]]}
              onValueChange={(value) => onFilterChange(name, value[0])}
              min={min}
              max={max}
              step={step}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            Object.keys(filters).forEach(filterName => {
              const defaultValue = ['brightness', 'contrast', 'saturation'].includes(filterName) ? 100 : 0;
              onFilterChange(filterName, defaultValue);
            });
          }}
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};
