import { useCallback, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { Cell } from './Cell';

export function Grid() {
  const { colors } = useTheme();
  const {
    grid,
    start,
    end,
    gridSize,
    isRunning,
    mouseState,
    setMouseState,
    toggleWall,
    setCellWall,
    moveStart,
    moveEnd,
    showValues,
  } = useGrid();

  const gridRef = useRef(null);

  const handleMouseDown = useCallback(
    (row, col) => {
      if (isRunning) return;
      const isStartNode = row === start.row && col === start.col;
      const isEndNode = row === end.row && col === end.col;
      const cell = grid[row][col];

      if (isStartNode) {
        setMouseState('dragging-start');
      } else if (isEndNode) {
        setMouseState('dragging-end');
      } else if (cell.isWall) {
        setMouseState('erasing');
        setCellWall(row, col, false);
      } else {
        setMouseState('drawing');
        toggleWall(row, col);
      }
    },
    [grid, start, end, isRunning, toggleWall, setCellWall, setMouseState]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (isRunning || !mouseState) return;

      if (mouseState === 'drawing') {
        setCellWall(row, col, true);
      } else if (mouseState === 'erasing') {
        setCellWall(row, col, false);
      } else if (mouseState === 'dragging-start') {
        moveStart(row, col);
      } else if (mouseState === 'dragging-end') {
        moveEnd(row, col);
      }
    },
    [mouseState, isRunning, setCellWall, moveStart, moveEnd]
  );

  const handleTouchStart = useCallback(
    (row, col) => {
      if (isRunning) return;
      const isStartNode = row === start.row && col === start.col;
      const isEndNode = row === end.row && col === end.col;
      const cell = grid[row][col];

      if (isStartNode) {
        setMouseState('dragging-start');
      } else if (isEndNode) {
        setMouseState('dragging-end');
      } else if (cell.isWall) {
        setMouseState('erasing');
        setCellWall(row, col, false);
      } else {
        setMouseState('drawing');
        toggleWall(row, col);
      }
    },
    [grid, start, end, isRunning, toggleWall, setCellWall, setMouseState]
  );

  useEffect(() => {
    const handleMouseUp = () => setMouseState(null);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [setMouseState]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!mouseState) return;
      const touch = e.touches[0];
      const rect = gridRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const col = Math.floor(x / gridSize.cellSize);
      const row = Math.floor(y / gridSize.cellSize);
      if (row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {
        handleMouseEnter(row, col);
      }
    };

    const handleTouchEnd = () => setMouseState(null);

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mouseState, handleMouseEnter, setMouseState]);

  return (
    <div
      className="flex justify-center items-center overflow-auto"
      style={{ touchAction: 'none' }}
    >
      <div
        ref={gridRef}
        className="inline-grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, ${gridSize.cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${gridSize.cellSize}px)`,
        }}
        onMouseLeave={() => setMouseState(null)}
      >
        {grid.map((row) =>
          row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              start={start}
              end={end}
              cellSize={gridSize.cellSize}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onTouchStart={handleTouchStart}
              showValues={showValues}
            />
          ))
        )}
      </div>
    </div>
  );
}
