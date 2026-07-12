import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { MAZE_ALGORITHMS, MAZE_INFO } from '../../utils/constants';
import { recursiveDivision } from '../../maze/recursiveDivision';
import { recursiveBacktracker } from '../../maze/recursiveBacktracker';
import { randomWalls } from '../../maze/randomWalls';

export function MazeGenerator() {
  const { colors } = useTheme();
  const { grid, start, end, gridSize, setWalls, clearVisualization, isRunning } = useGrid();
  const [isOpen, setIsOpen] = useState(false);

  const generateMaze = (algorithm) => {
    clearVisualization();
    let walls = [];

    switch (algorithm) {
      case MAZE_ALGORITHMS.RECURSIVE_DIVISION:
        walls = recursiveDivision(grid, start, end);
        break;
      case MAZE_ALGORITHMS.RECURSIVE_BACKTRACKER:
        walls = recursiveBacktracker(gridSize.rows, gridSize.cols, start, end);
        break;
      case MAZE_ALGORITHMS.RANDOM_WALLS:
        walls = randomWalls(gridSize.rows, gridSize.cols, start, end, 0.3);
        break;
    }

    setWalls(walls);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => !isRunning && setIsOpen(!isOpen)}
        disabled={isRunning}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${colors.buttonSecondary}`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        Maze
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`absolute top-full left-0 mt-2 w-72 p-1.5 rounded-xl border shadow-2xl z-50 ${colors.card}`}>
            {Object.values(MAZE_ALGORITHMS).map((algo) => {
              const info = MAZE_INFO[algo];
              return (
                <button
                  key={algo}
                  onClick={() => generateMaze(algo)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 ${colors.surfaceHover} group`}
                >
                  <div className={`text-sm font-medium ${colors.text} group-hover:text-violet-400 transition-colors`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {info.name}
                  </div>
                  <div className={`text-[11px] ${colors.textMuted} mt-0.5 leading-relaxed`}>
                    {info.description}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
