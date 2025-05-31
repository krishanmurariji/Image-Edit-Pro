
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { FilterPresets } from './FilterPresets';

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

  const handlePresetApply = (presetFilters: typeof filters) => {
    Object.entries(presetFilters).forEach(([filterName, value]) => {
      onFilterChange(filterName, value);
    });
  };

  const handleReset = () => {
    Object.keys(filters).forEach(filterName => {
      const defaultValue = ['brightness', 'contrast', 'saturation'].includes(filterName) ? 100 : 0;
      onFilterChange(filterName, defaultValue);
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters & Adjustments</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter Presets */}
      <FilterPresets onPresetApply={handlePresetApply} onReset={handleReset} />

      <Separator className="my-6" />

      {/* Manual Adjustments */}
      <div className="space-y-6">
        <h3 className="text-sm font-medium text-gray-700">Manual Adjustments</h3>
        {filterConfig.map(({ name, label, min, max, step }) => (
          <div key={name} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <span className="text-sm text-gray-500">
                {filters[name as keyof typeof filters]}%
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
    </div>
  );
};
