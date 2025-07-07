import React from 'react';

type ColorOption = 'yellow' | 'rose' | 'white';

interface ColorPickerProps {
  selectedColor: ColorOption;
  onColorChange: (color: ColorOption) => void;
  className?: string;
}

const ColorPicker = ({ selectedColor, onColorChange, className = '' }: ColorPickerProps) => {
  const colors: { value: ColorOption; name: string; bgColor: string; ringColor: string }[] = [
    { value: 'yellow', name: 'Yellow Gold', bgColor: '#E6CA97', ringColor: '#E6CA97' },
    { value: 'rose', name: 'Rose Gold', bgColor: '#E1A4A9', ringColor: '#E1A4A9' },
    { value: 'white', name: 'White Gold', bgColor: '#D9D9D9', ringColor: '#D9D9D9' },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-5 h-5 rounded-full transition-all duration-300 transform hover:scale-110
              ${selectedColor === color.value 
                ? 'ring-2 ring-offset-2 scale-110' 
                : 'hover:ring-2 hover:ring-gray-200 hover:ring-offset-1'
              }
            `}
            style={{
              backgroundColor: color.bgColor,
              boxShadow: selectedColor === color.value ? `0 0 0 4px #fff, 0 0 0 5px #000` : undefined
            }}
            title={color.name}
            aria-label={`Select ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
