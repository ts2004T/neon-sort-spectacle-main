
import { ArrayElement, ColorPalette } from './SortingVisualizer';

interface SortingBarProps {
  element: ArrayElement;
  index: number;
  totalElements: number;
  maxValue: number;
  colorPalette: ColorPalette;
}

const SortingBar = ({ element, index, totalElements, maxValue, colorPalette }: SortingBarProps) => {
  const height = (element.value / maxValue) * 280; // Max height of 280px
  const width = Math.max(4, (600 / totalElements) - 2); // Responsive width
  
  // Calculate gradient position based on sorted position
  const gradientPosition = index / (totalElements - 1);
  const [color1, color2] = colorPalette.colors;
  
  // Interpolate between the two colors
  const backgroundColor = element.state === 'sorted' 
    ? `linear-gradient(to top, ${color1}, ${color2})`
    : element.state === 'comparing'
    ? '#ffff00'
    : element.state === 'swapping' 
    ? '#ff0000'
    : element.state === 'pivot'
    ? '#ff8000'
    : color1;

  const getStateClass = () => {
    switch (element.state) {
      case 'comparing': return 'comparing';
      case 'swapping': return 'swapping';
      case 'sorted': return 'sorted';
      default: return '';
    }
  };

  return (
    <div
      className={`sorting-bar ${getStateClass()}`}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        background: backgroundColor,
        boxShadow: element.state !== 'default' 
          ? `0 0 10px ${backgroundColor}, 0 0 20px ${backgroundColor}` 
          : `0 0 5px ${color1}`,
      }}
    />
  );
};

export default SortingBar;
