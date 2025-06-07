
import { useState, useEffect, useCallback } from 'react';
import VisualizerDisplay from './VisualizerDisplay';
import ControlPanel from './ControlPanel';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';

export interface ArrayElement {
  value: number;
  id: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export interface ColorPalette {
  name: string;
  colors: string[];
  id: string;
}

const colorPalettes: ColorPalette[] = [
  {
    name: 'Cyan to Pink',
    colors: ['#00ffff', '#ff00ff'],
    id: 'cyan-pink'
  },
  {
    name: 'Purple to Green', 
    colors: ['#8000ff', '#00ff80'],
    id: 'purple-green'
  },
  {
    name: 'Orange to Blue',
    colors: ['#ff8000', '#0080ff'], 
    id: 'orange-blue'
  }
];

const SortingVisualizer = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(colorPalettes[0]);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(50);

  const generateRandomArray = useCallback(() => {
    if (isAnimating) return;
    
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 300) + 10,
        id: i,
        state: 'default'
      });
    }
    setArray(newArray);
  }, [arraySize, isAnimating]);

  const resetArrayStates = () => {
    setArray(prev => prev.map(element => ({ ...element, state: 'default' as const })));
  };

  const startSorting = async () => {
    if (isAnimating || array.length === 0) return;
    
    resetArrayStates();
    setIsAnimating(true);
    
    const algorithm = sortingAlgorithms[selectedAlgorithm];
    await algorithm(array, setArray, animationSpeed);
    
    // Mark all as sorted
    setArray(prev => prev.map(element => ({ ...element, state: 'sorted' as const })));
    setIsAnimating(false);
  };

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <ControlPanel
        algorithms={Object.keys(sortingAlgorithms)}
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        colorPalettes={colorPalettes}
        selectedPalette={selectedPalette}
        onPaletteChange={setSelectedPalette}
        animationSpeed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        arraySize={arraySize}
        onArraySizeChange={setArraySize}
        isAnimating={isAnimating}
        onGenerateArray={generateRandomArray}
        onStartSorting={startSorting}
      />
      
      <VisualizerDisplay
        array={array}
        colorPalette={selectedPalette}
      />
    </div>
  );
};

export default SortingVisualizer;
