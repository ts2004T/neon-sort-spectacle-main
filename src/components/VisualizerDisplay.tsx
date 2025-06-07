
import { ArrayElement, ColorPalette } from './SortingVisualizer';
import SortingBar from './SortingBar';

interface VisualizerDisplayProps {
  array: ArrayElement[];
  colorPalette: ColorPalette;
}

const VisualizerDisplay = ({ array, colorPalette }: VisualizerDisplayProps) => {
  const maxValue = Math.max(...array.map(el => el.value));

  return (
    <div className="visualizer-container mt-8">
      <div className="flex items-end justify-center h-80 overflow-hidden">
        {array.map((element, index) => (
          <SortingBar
            key={element.id}
            element={element}
            index={index}
            totalElements={array.length}
            maxValue={maxValue}
            colorPalette={colorPalette}
          />
        ))}
      </div>
    </div>
  );
};

export default VisualizerDisplay;
