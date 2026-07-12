import { memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Cell = memo(function Cell({ cell, start, end, cellSize, onMouseDown, onMouseEnter, onTouchStart, showValues }) {
  const { colors } = useTheme();

  const isStart = cell.row === start.row && cell.col === start.col;
  const isEnd = cell.row === end.row && cell.col === end.col;

  let colorClass = colors.cell.empty;
  let animClass = '';
  if (cell.isWall) { colorClass = colors.cell.wall; animClass = 'cell-wall'; }
  else if (isStart) { colorClass = colors.cell.start; animClass = 'cell-start'; }
  else if (isEnd) { colorClass = colors.cell.end; animClass = 'cell-end'; }
  else if (cell.isPath) { colorClass = colors.cell.path; animClass = 'cell-path'; }
  else if (cell.isVisited) { colorClass = colors.cell.visited; animClass = 'cell-visited'; }
  else if (cell.isFrontier) { colorClass = colors.cell.frontier; animClass = 'cell-frontier'; }

  const showValue = showValues && !cell.isWall && !isStart && !isEnd && (cell.isVisited || cell.isPath);
  const value = cell.totalCost !== undefined && cell.totalCost !== Infinity ? cell.totalCost
    : cell.distance !== undefined && cell.distance !== Infinity ? cell.distance
    : null;

  const markerSize = Math.max(cellSize * 0.65, 14);

  return (
    <div
      className={`${colorClass} ${animClass} transition-colors duration-[80ms] flex items-center justify-center select-none relative cursor-crosshair`}
      style={{
        width: cellSize,
        height: cellSize,
        minWidth: cellSize,
        minHeight: cellSize,
      }}
      onMouseDown={() => onMouseDown(cell.row, cell.col)}
      onMouseEnter={() => onMouseEnter(cell.row, cell.col)}
      onTouchStart={(e) => {
        e.preventDefault();
        onTouchStart(cell.row, cell.col);
      }}
      data-row={cell.row}
      data-col={cell.col}
    >
      {isStart && (
        <div
          className="rounded-full bg-white flex items-center justify-center font-bold shadow-lg pointer-events-none"
          style={{
            width: markerSize,
            height: markerSize,
            fontSize: Math.max(markerSize * 0.5, 8),
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)',
          }}
        >
          S
        </div>
      )}
      {isEnd && (
        <div
          className="rounded-full bg-white flex items-center justify-center font-bold shadow-lg pointer-events-none"
          style={{
            width: markerSize,
            height: markerSize,
            fontSize: Math.max(markerSize * 0.5, 8),
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 10px rgba(251, 113, 133, 0.5)',
          }}
        >
          E
        </div>
      )}
      {showValue && value !== null && value < 9999 && (
        <span
          className={`absolute text-[6px] leading-none font-bold ${colors.valueText} pointer-events-none`}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}
        >
          {Math.round(value)}
        </span>
      )}
    </div>
  );
});
