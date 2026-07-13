import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { useCompare } from '../../context/CompareContext';
import { algorithmMap } from '../../algorithms';
import { ALGORITHM_INFO, ALGORITHM_COLORS } from '../../utils/constants';
import { resetGridState, sleep } from '../../utils/helpers';
import { CompareGrid } from './CompareGrid';
import { ComparisonTable } from './ComparisonTable';

function getCompareCellSize() {
  const w = window.innerWidth;
  if (w < 640) return 8;
  if (w < 1024) return 10;
  return 12;
}

export function CompareView() {
  const { colors } = useTheme();
  const { grid, start, end, speed, gridSize } = useGrid();
  const { selectedAlgorithms, isRacing, setIsRacing, raceResults, addRaceResult, clearResults } = useCompare();

  const [liveGrids, setLiveGrids] = useState({});
  const [cellSize, setCellSize] = useState(getCompareCellSize);

  useEffect(() => {
    const onResize = () => setCellSize(getCompareCellSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const runRace = useCallback(async () => {
    if (isRacing) return;

    setIsRacing(true);
    clearResults();

    const cleanGrid = resetGridState(grid);
    const initialGrids = {};
    selectedAlgorithms.forEach((algo) => {
      initialGrids[algo] = cleanGrid.map((row) => row.map((cell) => ({ ...cell })));
    });
    setLiveGrids(initialGrids);

    await new Promise((r) => setTimeout(r, 50));

    const results = [];

    const runSingleAlgorithm = async (algo) => {
      const startTime = performance.now();
      const algorithmFn = algorithmMap[algo];
      const { steps, path, nodesExplored } = algorithmFn(cleanGrid, start, end);

      const algoGrid = cleanGrid.map((row) => row.map((cell) => ({ ...cell })));

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const cell = algoGrid[step.row][step.col];

        if (step.type === 'visit') {
          cell.isVisited = true;
          cell.isFrontier = false;
        } else if (step.type === 'frontier') {
          if (!cell.isVisited) cell.isFrontier = true;
        }

        if (i % 2 === 0) {
          setLiveGrids((prev) => ({
            ...prev,
            [algo]: algoGrid.map((row) => row.map((cell) => ({ ...cell }))),
          }));
          await sleep(speed.delay);
        }
      }

      await sleep(speed.delay * 2);

      for (let i = 0; i < path.length; i++) {
        const { row, col } = path[i];
        algoGrid[row][col].isPath = true;
        algoGrid[row][col].isVisited = false;
        algoGrid[row][col].isFrontier = false;

        if (i % 2 === 0) {
          setLiveGrids((prev) => ({
            ...prev,
            [algo]: algoGrid.map((row) => row.map((cell) => ({ ...cell }))),
          }));
          await sleep(speed.delay * 2);
        }
      }

      setLiveGrids((prev) => ({
        ...prev,
        [algo]: algoGrid.map((row) => row.map((cell) => ({ ...cell }))),
      }));

      return {
        algorithm: algo,
        nodesExplored,
        pathLength: path.length,
        time: Math.round(performance.now() - startTime),
        color: ALGORITHM_COLORS[algo].hex,
      };
    };

    const promises = selectedAlgorithms.map((algo) => runSingleAlgorithm(algo));
    const allResults = await Promise.all(promises);

    allResults.forEach((result) => addRaceResult(result));
    setIsRacing(false);
  }, [grid, start, end, speed, selectedAlgorithms, isRacing, setIsRacing, clearResults, addRaceResult]);

  useEffect(() => {
    if (selectedAlgorithms.length > 0 && Object.keys(liveGrids).length === 0) {
      const cleanGrid = resetGridState(grid);
      const initialGrids = {};
      selectedAlgorithms.forEach((algo) => {
        initialGrids[algo] = cleanGrid.map((row) => row.map((cell) => ({ ...cell })));
      });
      setLiveGrids(initialGrids);
    }
  }, [selectedAlgorithms, grid]);

  const numAlgos = selectedAlgorithms.length;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const gridPerRow = isMobile ? 2 : Math.min(numAlgos, 3);

  return (
    <div className="w-full flex flex-col items-center gap-3 overflow-hidden">
      {!isRacing && (
        <button
          onClick={runRace}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Race {numAlgos} Algorithms
          </span>
        </button>
      )}

      {isRacing && (
        <div className={`flex items-center gap-2 text-sm ${colors.textMuted}`}>
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Racing...
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {selectedAlgorithms.map((algo) => {
          const info = ALGORITHM_INFO[algo];
          const algoColors = ALGORITHM_COLORS[algo];
          const algoGrid = liveGrids[algo];

          return (
            <div key={algo} className={`flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl border ${colors.card}`}>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${algoColors.dot}`} />
                <span className={`text-[10px] sm:text-xs font-semibold ${algoColors.label}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {info.shortName}
                </span>
              </div>
              <div className={`rounded-lg border ${colors.gridBorder} overflow-visible`}>
                {algoGrid ? (
                  <CompareGrid
                    grid={algoGrid}
                    start={start}
                    end={end}
                    cellSize={cellSize}
                    algorithmId={algo}
                  />
                ) : (
                  <div className="flex items-center justify-center text-[10px] text-gray-500"
                    style={{ width: gridSize.cols * cellSize, height: gridSize.rows * cellSize }}>
                    Click Race to start
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {raceResults.length > 0 && (
        <ComparisonTable results={raceResults} />
      )}
    </div>
  );
}
