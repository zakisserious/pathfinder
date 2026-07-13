import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GridProvider, useGrid } from './context/GridContext';
import { CompareProvider, useCompare } from './context/CompareContext';
import { Toolbar } from './components/Controls/Toolbar';
import { Grid } from './components/Grid/Grid';
import { Legend } from './components/Legend/Legend';
import { MetricsPanel } from './components/Metrics/MetricsPanel';
import { CompareView } from './components/Compare/CompareView';
import { Tutorial } from './components/Tutorial/Tutorial';

function AppContent() {
  const { colors } = useTheme();
  const { isCompareMode } = useCompare();

  return (
    <div className={`min-h-screen flex flex-col ${colors.bg} ${colors.text} transition-colors duration-500`}>
      <Toolbar />
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-2 gap-2 sm:gap-3">
        <MetricsPanel />
        {isCompareMode ? (
          <CompareView />
        ) : (
          <>
            <div className={`rounded-xl sm:rounded-2xl border ${colors.gridBorder} overflow-visible ${colors.gridGlow} grid-glow flex justify-center`}>
              <Grid />
            </div>
            <Legend />
          </>
        )}
      </main>
      <Tutorial />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <GridProvider>
        <CompareProvider>
          <AppContent />
        </CompareProvider>
      </GridProvider>
    </ThemeProvider>
  );
}

export default App;
