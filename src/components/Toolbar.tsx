
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Upload,
  Crop,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Brightness,
  Undo,
  Redo,
  Image,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  onRotate: (angle: number) => void;
  onFlip: (direction: 'horizontal' | 'vertical') => void;
  onCrop: (aspectRatio: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onFilterToggle: () => void;
  onDownload: (format: 'png' | 'jpeg') => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedTool,
  onToolSelect,
  onRotate,
  onFlip,
  onCrop,
  onUndo,
  onRedo,
  onFilterToggle,
  onDownload,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Image Editor</h1>
        <p className="text-sm text-gray-500">Professional image editing tools</p>
      </div>

      {/* History Controls */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">History</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1"
          >
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1"
          >
            <Redo className="w-4 h-4 mr-2" />
            Redo
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Transform Tools */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Transform</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRotate(90)}
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Rotate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRotate(-90)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Rotate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFlip('horizontal')}
          >
            <FlipHorizontal className="w-4 h-4 mr-2" />
            Flip H
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFlip('vertical')}
          >
            <FlipVertical className="w-4 h-4 mr-2" />
            Flip V
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <Crop className="w-4 h-4 mr-2" />
              Crop
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onCrop('1:1')}>
              Square (1:1)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCrop('16:9')}>
              Widescreen (16:9)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCrop('4:3')}>
              Standard (4:3)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="my-4" />

      {/* Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Adjust</h3>
        <Button
          variant="outline"
          className="w-full"
          onClick={onFilterToggle}
        >
          <Brightness className="w-4 h-4 mr-2" />
          Filters & Adjustments
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Export */}
      <div className="mt-auto">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Export</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">
              <Image className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onDownload('png')}>
              Download as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownload('jpeg')}>
              Download as JPEG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
