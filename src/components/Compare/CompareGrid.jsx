import { memo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ALGORITHM_COLORS } from '../../utils/constants';

export const CompareGrid = memo(function CompareGrid({ grid, start, end, cellSize, algorithmId }) {
  const { colors } = useTheme();
  const algoColors = ALGORITHM_COLORS[algorithmId];

  return (
    <div className="inline-grid gap-0" style={{
      gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
    }}>
      {grid.map((row) =>
        row.map((cell) => {
          const isStart = cell.row === start.row && cell.col === start.col;
          const isEnd = cell.row === end.row && cell.col === end.col;

          let bgColor = colors.cell.empty;
          let animClass = '';
          if (cell.isWall) { bgColor = colors.cell.wall; animClass = 'cell-wall'; }
          else if (isStart) { bgColor = colors.cell.start; animClass = 'cell-start'; }
          else if (isEnd) { bgColor = colors.cell.end; animClass = 'cell-end'; }
          else if (cell.isPath) { bgColor = algoColors.path; animClass = 'cell-path'; }
          else if (cell.isVisited) { bgColor = algoColors.visited; animClass = 'cell-visited'; }
          else if (cell.isFrontier) { bgColor = algoColors.visited + '/50'; animClass = 'cell-frontier'; }

          const markerSize = Math.max(cellSize * 0.6, 12);

          return (
            <div
              key={`${cell.row}-${cell.col}`}
              className={`${bgColor} ${animClass} flex items-center justify-center`}
              style={{ width: cellSize, height: cellSize, minWidth: cellSize, minHeight: cellSize }}
            >
              {isStart && (
                <div className="rounded-full bg-white flex items-center justify-center font-bold shadow-md"
                  style={{
                    width: markerSize,
                    height: markerSize,
                    fontSize: Math.max(markerSize * 0.5, 7),
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >S</div>
              )}
              {isEnd && (
                <div className="rounded-full bg-white flex items-center justify-center font-bold shadow-md"
                  style={{
                    width: markerSize,
                    height: markerSize,
                    fontSize: Math.max(markerSize * 0.5, 7),
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >E</div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
});
