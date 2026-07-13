import { createContext, useContext, useState, useCallback } from 'react';
import { CELL_STATES, ALGORITHMS, SPEEDS } from '../utils/constants';
import { calculateGridSize, createEmptyGrid, getDefaultStartEnd, resetGridState } from '../utils/helpers';

const GridContext = createContext();

export function GridProvider({ children }) {
  const [gridSize] = useState(() => calculateGridSize());
  const [grid, setGrid] = useState(() => {
    const { rows, cols } = gridSize;
    return createEmptyGrid(rows, cols);
  });
  const [start, setStart] = useState(() => {
    const { rows, cols } = gridSize;
    return getDefaultStartEnd(rows, cols).start;
  });
  const [end, setEnd] = useState(() => {
    const { rows, cols } = gridSize;
    return getDefaultStartEnd(rows, cols).end;
  });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHMS.ASTAR);
  const [speed, setSpeed] = useState(SPEEDS.MEDIUM);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [metrics, setMetrics] = useState({ nodesExplored: 0, pathLength: 0, time: 0 });
  const [mouseState, setMouseState] = useState(null);
  const [drawingMode, setDrawingMode] = useState(null);
  const [hasRun, setHasRun] = useState(false);

  const clearVisualization = useCallback(() => {
    setGrid((prev) => resetGridState(prev));
    setMetrics({ nodesExplored: 0, pathLength: 0, time: 0 });
    setHasRun(false);
  }, []);

  const clearAll = useCallback(() => {
    const { rows, cols } = gridSize;
    const newGrid = createEmptyGrid(rows, cols);
    const defaults = getDefaultStartEnd(rows, cols);
    setGrid(newGrid);
    setStart(defaults.start);
    setEnd(defaults.end);
    setMetrics({ nodesExplored: 0, pathLength: 0, time: 0 });
    setIsRunning(false);
    setIsPaused(false);
    setHasRun(false);
  }, [gridSize]);

  const toggleWall = useCallback((row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      const cell = newGrid[row][col];
      if (cell.isStart || cell.isEnd) return prev;
      cell.isWall = !cell.isWall;
      return newGrid;
    });
  }, []);

  const setCellWall = useCallback((row, col, isWall) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      const cell = newGrid[row][col];
      if (cell.isStart || cell.isEnd) return prev;
      cell.isWall = isWall;
      return newGrid;
    });
  }, []);

  const moveStart = useCallback((row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      const oldCell = newGrid[start.row][start.col];
      oldCell.isStart = false;
      const newCell = newGrid[row][col];
      if (newCell.isWall || newCell.isEnd) return prev;
      newCell.isStart = true;
      return newGrid;
    });
    setStart({ row, col });
  }, [start]);

  const moveEnd = useCallback((row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      const oldCell = newGrid[end.row][end.col];
      oldCell.isEnd = false;
      const newCell = newGrid[row][col];
      if (newCell.isWall || newCell.isStart) return prev;
      newCell.isEnd = true;
      return newGrid;
    });
    setEnd({ row, col });
  }, [end]);

  const setWalls = useCallback((walls) => {
    setGrid((prev) => {
      const rows = prev.length;
      const cols = prev[0]?.length || 0;
      const newGrid = prev.map((r) => r.map((c) => ({ ...c, isWall: false })));
      walls.forEach(({ row, col }) => {
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
          if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
            newGrid[row][col].isWall = true;
          }
        }
      });
      return newGrid;
    });
  }, []);

  const addWall = useCallback((row, col) => {
    setGrid((prev) => {
      const cell = prev[row][col];
      if (cell.isStart || cell.isEnd || cell.isWall) return prev;
      const newGrid = prev.map((r) => r.map((c) => ({ ...c })));
      newGrid[row][col].isWall = true;
      return newGrid;
    });
  }, []);

  const updateGrid = useCallback((newGrid) => {
    setGrid(newGrid);
  }, []);

  return (
    <GridContext.Provider
      value={{
        grid,
        setGrid,
        start,
        end,
        gridSize,
        selectedAlgorithm,
        setSelectedAlgorithm,
        speed,
        setSpeed,
        isRunning,
        setIsRunning,
        isPaused,
        setIsPaused,
        showValues,
        setShowValues,
        metrics,
        setMetrics,
        mouseState,
        setMouseState,
        drawingMode,
        setDrawingMode,
        hasRun,
        setHasRun,
        clearVisualization,
        clearAll,
        toggleWall,
        setCellWall,
        moveStart,
        moveEnd,
        setWalls,
        addWall,
        updateGrid,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within GridProvider');
  return context;
}
