
import SortingVisualizer from '../components/SortingVisualizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="neon-title text-4xl md:text-6xl lg:text-7xl mb-4">
            SORTING ALGORITHM VISUALIZER
          </h1>
        </header>
        
        <main>
          <SortingVisualizer />
        </main>
      </div>
    </div>
  );
};

export default Index;
