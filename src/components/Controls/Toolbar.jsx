import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { useCompare } from '../../context/CompareContext';
import { algorithmMap } from '../../algorithms';
import { Button } from '../UI/Button';
import { AlgorithmPicker } from './AlgorithmPicker';
import { AlgorithmInfo } from './AlgorithmInfo';
import { SpeedSlider } from './SpeedSlider';
import { MazeGenerator } from './MazeGenerator';
import { Toggle } from '../UI/Toggle';
import { sleep, resetGridState } from '../../utils/helpers';

export function Toolbar() {
  const { colors, theme, toggleTheme } = useTheme();
  const {
    grid,
    start,
    end,
    selectedAlgorithm,
    speed,
    isRunning,
    setIsRunning,
    showValues,
    setShowValues,
    clearVisualization,
    clearAll,
    updateGrid,
    setMetrics,
    setHasRun,
  } = useGrid();

  const {
    isCompareMode,
    setIsCompareMode,
    exitCompareMode,
    isRacing,
  } = useCompare();

  const [controlsOpen, setControlsOpen] = useState(false);

  const runAlgorithm = async () => {
    if (isRunning) return;
    setControlsOpen(false);

    const cleanGrid = resetGridState(grid);
    updateGrid(cleanGrid);
    setMetrics({ nodesExplored: 0, pathLength: 0, time: 0 });
    setHasRun(false);
    await new Promise((r) => setTimeout(r, 30));

    setIsRunning(true);
    setHasRun(true);
    const startTime = performance.now();

    const algorithmFn = algorithmMap[selectedAlgorithm];
    const { steps, path, nodesExplored } = algorithmFn(cleanGrid, start, end);

    const workingGrid = cleanGrid.map((row) => row.map((cell) => ({ ...cell })));

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const cell = workingGrid[step.row][step.col];

      if (step.type === 'visit') {
        cell.isVisited = true;
        cell.isFrontier = false;
        cell.distance = step.g;
        cell.heuristic = step.h;
        cell.totalCost = step.f;
      } else if (step.type === 'frontier') {
        if (!cell.isVisited) {
          cell.isFrontier = true;
          cell.distance = step.g;
          cell.heuristic = step.h;
          cell.totalCost = step.f;
        }
      }

      if (i % 3 === 0) {
        updateGrid(workingGrid.map((row) => row.map((cell) => ({ ...cell }))));
        await sleep(speed.delay);
      }
    }

    updateGrid(workingGrid.map((row) => row.map((cell) => ({ ...cell }))));
    await sleep(speed.delay * 3);

    for (let i = 0; i < path.length; i++) {
      const { row, col } = path[i];
      workingGrid[row][col].isPath = true;
      workingGrid[row][col].isVisited = false;
      workingGrid[row][col].isFrontier = false;

      if (i % 2 === 0) {
        updateGrid(workingGrid.map((row) => row.map((cell) => ({ ...cell }))));
        await sleep(speed.delay * 2);
      }
    }

    updateGrid(workingGrid.map((row) => row.map((cell) => ({ ...cell }))));
    const endTime = performance.now();

    setMetrics({
      nodesExplored,
      pathLength: path.length,
      time: Math.round(endTime - startTime),
    });

    setIsRunning(false);
  };

  const toggleCompareMode = () => {
    if (isCompareMode) {
      exitCompareMode();
      clearVisualization();
    } else {
      setIsCompareMode(true);
      clearVisualization();
    }
  };

  return (
    <>
      <header className={`w-full border-b ${colors.toolbar} sticky top-0 z-40`}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between h-12">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <h1
              className="text-base sm:text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className={colors.text}>Path</span>
              <span className="text-violet-400">finder</span>
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isCompareMode && (
              <Button onClick={runAlgorithm} disabled={isRunning} variant="primary" size="sm">
                {isRunning ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Solving
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Run
                  </span>
                )}
              </Button>
            )}

            <button
              onClick={toggleCompareMode}
              className={`px-2 py-1.5 text-[10px] sm:text-xs rounded-lg font-medium transition-all duration-200 cursor-pointer border ${
                isCompareMode
                  ? 'bg-violet-600/20 border-violet-500/50 text-violet-400'
                  : `${colors.buttonSecondary}`
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="hidden sm:inline">{isCompareMode ? 'Exit Compare' : 'Compare'}</span>
              <span className="sm:hidden">{isCompareMode ? 'Exit' : 'VS'}</span>
            </button>

            <button
              onClick={() => setControlsOpen(!controlsOpen)}
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${controlsOpen ? 'bg-violet-600/20 text-violet-400' : colors.buttonSecondary}`}
              aria-label="Toggle controls"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>

            <Toggle checked={theme === 'light'} onChange={toggleTheme} label="Toggle theme" />
          </div>
        </div>
      </header>

      {controlsOpen && (
        <div className={`w-full border-b ${colors.surface} relative z-30`}>
          <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 min-w-0">
                <AlgorithmPicker />
              </div>
              {!isCompareMode && (
                <div className="lg:w-80 xl:w-96">
                  <AlgorithmInfo />
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Button onClick={clearVisualization} disabled={isRunning || isRacing} variant="secondary" size="sm">
                Clear Path
              </Button>
              <Button onClick={clearAll} disabled={isRunning || isRacing} variant="danger" size="sm">
                Reset
              </Button>

              <div className="hidden sm:block w-px h-5 bg-[#1E293B] mx-1" />

              <MazeGenerator />

              <div className="hidden sm:block w-px h-5 bg-[#1E293B] mx-1" />

              <SpeedSlider />

              {!isCompareMode && (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block w-px h-5 bg-[#1E293B] mx-1" />
                  <Toggle checked={showValues} onChange={setShowValues} label="Show costs" />
                  <span className={`text-xs ${colors.textMuted}`}>Costs</span>
                  {showValues && (
                    <span
                      className={`text-[10px] ${colors.textMuted} hidden lg:inline`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      top = f (total) &middot; bottom = g (traveled) h (estimate)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
