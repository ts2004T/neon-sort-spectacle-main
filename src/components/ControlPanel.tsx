
import { ColorPalette } from './SortingVisualizer';

interface ControlPanelProps {
  algorithms: string[];
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  colorPalettes: ColorPalette[];
  selectedPalette: ColorPalette;
  onPaletteChange: (palette: ColorPalette) => void;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  isAnimating: boolean;
  onGenerateArray: () => void;
  onStartSorting: () => void;
}

const formatAlgorithmName = (algorithm: string) => {
  const names: { [key: string]: string } = {
    bubbleSort: 'Bubble Sort',
    selectionSort: 'Selection Sort', 
    insertionSort: 'Insertion Sort',
    mergeSort: 'Merge Sort',
    quickSort: 'Quick Sort'
  };
  return names[algorithm] || algorithm;
};

const ControlPanel = ({
  algorithms,
  selectedAlgorithm,
  onAlgorithmChange,
  colorPalettes,
  selectedPalette,
  onPaletteChange,
  animationSpeed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
  isAnimating,
  onGenerateArray,
  onStartSorting
}: ControlPanelProps) => {
  return (
    <div className="visualizer-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Algorithm Selection */}
        <div>
          <label className="neon-text block text-sm font-medium mb-3">
            Algorithm
          </label>
          <select
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value)}
            disabled={isAnimating}
            className="w-full bg-transparent border-2 border-neon-cyan text-neon-cyan p-2 rounded-lg font-neon focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          >
            {algorithms.map(algorithm => (
              <option 
                key={algorithm} 
                value={algorithm}
                className="bg-slate-900 text-neon-cyan"
              >
                {formatAlgorithmName(algorithm)}
              </option>
            ))}
          </select>
        </div>

        {/* Color Palette Selection */}
        <div>
          <label className="neon-text block text-sm font-medium mb-3">
            Color Palette
          </label>
          <div className="flex gap-2">
            {colorPalettes.map(palette => (
              <button
                key={palette.id}
                onClick={() => onPaletteChange(palette)}
                disabled={isAnimating}
                className={`palette-option palette-${palette.id} ${
                  selectedPalette.id === palette.id ? 'selected' : ''
                }`}
                title={palette.name}
              />
            ))}
          </div>
        </div>

        {/* Speed Control */}
        <div>
          <label className="neon-text block text-sm font-medium mb-3">
            Speed: {animationSpeed}ms
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={animationSpeed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            disabled={isAnimating}
            className="speed-slider w-full"
          />
        </div>

        {/* Array Size Control */}
        <div>
          <label className="neon-text block text-sm font-medium mb-3">
            Size: {arraySize}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={isAnimating}
            className="speed-slider w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={onGenerateArray}
          disabled={isAnimating}
          className="neon-button"
        >
          Generate New Array
        </button>
        
        <button
          onClick={onStartSorting}
          disabled={isAnimating}
          className="neon-button pink"
        >
          {isAnimating ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
