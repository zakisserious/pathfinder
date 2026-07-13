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
  const f = cell.totalCost !== undefined && cell.totalCost !== Infinity ? cell.totalCost : null;
  const g = cell.distance !== undefined && cell.distance !== Infinity ? cell.distance : null;
  const h = cell.heuristic !== undefined && cell.heuristic !== Infinity ? cell.heuristic : null;
  const hasCostData = (f !== null && f > 0) || (g !== null && g > 0);
  const labelSize = Math.max(cellSize * 0.28, 5);
  const valueSize = Math.max(cellSize * 0.32, 6);

  const markerSize = Math.max(cellSize * 0.7, 16);

  return (
    <div
      className={`${colorClass} ${animClass} flex items-center justify-center select-none relative cursor-crosshair`}
      style={{
        width: cellSize,
        height: cellSize,
        minWidth: cellSize,
        minHeight: cellSize,
        transition: 'background-color 60ms ease',
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
          className="rounded-full bg-white flex items-center justify-center font-bold pointer-events-none"
          style={{
            width: markerSize,
            height: markerSize,
            fontSize: Math.max(markerSize * 0.5, 9),
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 12px rgba(52, 211, 153, 0.6), 0 0 24px rgba(52, 211, 153, 0.3)',
          }}
        >
          S
        </div>
      )}
      {isEnd && (
        <div
          className="rounded-full bg-white flex items-center justify-center font-bold pointer-events-none"
          style={{
            width: markerSize,
            height: markerSize,
            fontSize: Math.max(markerSize * 0.5, 9),
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 12px rgba(251, 113, 133, 0.6), 0 0 24px rgba(251, 113, 133, 0.3)',
          }}
        >
          E
        </div>
      )}
      {showValue && hasCostData && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none leading-none"
          style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
        >
          <span className={`font-bold ${colors.valueText}`} style={{ fontSize: valueSize }}>
            {f !== null ? Math.round(f) : ''}
          </span>
          <span className={`${colors.textMuted}`} style={{ fontSize: labelSize }}>
            {g !== null ? Math.round(g) : ''}{g !== null && h !== null ? ' ' : ''}{h !== null ? Math.round(h) : ''}
          </span>
        </div>
      )}
    </div>
  );
});
