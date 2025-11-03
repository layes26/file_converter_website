import React, { useState, useEffect } from 'react';
import { Palette, Image, Grid, Droplet } from 'lucide-react';

const BackgroundSelector = ({ onSelect }) => {
  const [backgroundOptions, setBackgroundOptions] = useState(null);
  const [selectedType, setSelectedType] = useState('solid');
  const [selectedOption, setSelectedOption] = useState('white');
  const [customColor, setCustomColor] = useState('#FFFFFF');
  const [gradientAngle, setGradientAngle] = useState('45');
  const [patternScale, setPatternScale] = useState('1');
  const [patternColor, setPatternColor] = useState('#000000');

  useEffect(() => {
    fetch('http://localhost:5008/api/background-options')
      .then(res => res.json())
      .then(data => setBackgroundOptions(data))
      .catch(err => console.error('Failed to fetch background options:', err));
  }, []);

  const handleSelect = (type, option) => {
    setSelectedType(type);
    setSelectedOption(option);
    onSelect({
      bg_type: type,
      bg_option: option,
      bg_color: type === 'solid' ? customColor : undefined,
      gradient_angle: type === 'gradient' ? gradientAngle : undefined,
      pattern_scale: type === 'pattern' ? patternScale : undefined,
      pattern_color: type === 'pattern' ? patternColor : undefined,
    });
  };

  if (!backgroundOptions) return null;

  const renderColorPreview = (color) => (
    <div
      className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-inner"
      style={{ backgroundColor: color.startsWith('#') ? color : `#${color}` }}
    />
  );

  const renderGradientPreview = (colors) => (
    <div
      className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-inner"
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${colors[0]}, ${colors[1]})`
      }}
    />
  );

  const renderPatternPreview = (pattern) => (
    <div className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-inner bg-gray-100 flex items-center justify-center">
      <Grid className="w-5 h-5 text-gray-600" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedType('solid')}
          className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
            selectedType === 'solid' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Droplet className="w-6 h-6" />
          <span>Solid Color</span>
        </button>
        <button
          onClick={() => setSelectedType('gradient')}
          className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
            selectedType === 'gradient' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Palette className="w-6 h-6" />
          <span>Gradient</span>
        </button>
        <button
          onClick={() => setSelectedType('pattern')}
          className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
            selectedType === 'pattern' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Grid className="w-6 h-6" />
          <span>Pattern</span>
        </button>
        <button
          onClick={() => handleSelect('transparent', null)}
          className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
            selectedType === 'transparent' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Image className="w-6 h-6" />
          <span>Transparent</span>
        </button>
      </div>

      {selectedType === 'solid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-3">
            {Object.entries(backgroundOptions.solid_colors).map(([name, color]) => (
              <button
                key={name}
                onClick={() => handleSelect('solid', name)}
                className={`p-3 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                  selectedOption === name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {renderColorPreview(color)}
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Custom Color:</label>
            <input
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                handleSelect('solid', 'custom');
              }}
              className="w-20 h-10 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {selectedType === 'gradient' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(backgroundOptions.gradients).map(([name, colors]) => (
              <button
                key={name}
                onClick={() => handleSelect('gradient', name)}
                className={`p-3 border-2 rounded-xl flex items-center gap-3 transition-all ${
                  selectedOption === name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {renderGradientPreview(colors)}
                <span className="text-sm capitalize">{name.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Angle:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => {
                setGradientAngle(e.target.value);
                handleSelect('gradient', selectedOption);
              }}
              className="flex-1"
            />
            <span className="text-sm font-medium">{gradientAngle}°</span>
          </div>
        </div>
      )}

      {selectedType === 'pattern' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(backgroundOptions.patterns).map(([name, pattern]) => (
              <button
                key={name}
                onClick={() => handleSelect('pattern', name)}
                className={`p-3 border-2 rounded-xl flex items-center gap-3 transition-all ${
                  selectedOption === name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {renderPatternPreview(pattern)}
                <span className="text-sm capitalize">{name.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Pattern Color:</label>
              <input
                type="color"
                value={patternColor}
                onChange={(e) => {
                  setPatternColor(e.target.value);
                  handleSelect('pattern', selectedOption);
                }}
                className="w-20 h-10 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Pattern Scale:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={patternScale}
                onChange={(e) => {
                  setPatternScale(e.target.value);
                  handleSelect('pattern', selectedOption);
                }}
                className="flex-1"
              />
              <span className="text-sm font-medium">×{patternScale}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSelector;