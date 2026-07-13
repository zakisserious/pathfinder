import { useState, useRef } from 'react';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const abortRef = useRef(false);

  const generateMaze = async (algorithm) => {
    if (isRunning || isGenerating) return;
    setIsGenerating(true);
    setIsOpen(false);
    clearVisualization();
    abortRef.current = false;

    await new Promise((r) => setTimeout(r, 30));

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

    if (abortRef.current) {
      setIsGenerating(false);
      return;
    }

    const total = walls.length;
    const chunkSize = Math.max(1, Math.floor(total / 20));

    for (let i = 0; i < total; i += chunkSize) {
      if (abortRef.current) break;
      setWalls(walls.slice(0, i + chunkSize));
      await new Promise((r) => setTimeout(r, 25));
    }

    setWalls(walls);
    setIsGenerating(false);
  };

  const algoEntries = Object.values(MAZE_ALGORITHMS);

  return (
    <div className="relative">
      <button
        onClick={() => !isRunning && !isGenerating && setIsOpen(!isOpen)}
        disabled={isRunning || isGenerating}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${isGenerating ? 'bg-violet-600/20 border border-violet-500/50 text-violet-400' : colors.buttonSecondary}`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {isGenerating ? (
          <span className="w-3 h-3 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        )}
        {isGenerating ? '...' : 'Maze'}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className={`hidden sm:block absolute top-full left-0 mt-2 w-80 rounded-xl border shadow-2xl z-50 overflow-hidden ${colors.card}`}>
            <div className={`px-3 py-2 border-b ${colors.border}`}>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${colors.textMuted}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Generate Maze
              </span>
            </div>
            <div className="p-1.5">
              {algoEntries.map((algo) => {
                const info = MAZE_INFO[algo];
                return (
                  <button
                    key={algo}
                    onClick={() => generateMaze(algo)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 ${colors.surfaceHover} group`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-violet-600/20 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${colors.text} group-hover:text-violet-400 transition-colors`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {info.name}
                        </div>
                        <div className={`text-[11px] ${colors.textMuted} mt-0.5 leading-relaxed`}>
                          {info.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t shadow-2xl ${colors.card} ${colors.border}`}>
            <div className={`px-4 py-3 border-b ${colors.border} flex items-center justify-between`}>
              <span className={`text-xs font-semibold uppercase tracking-wider ${colors.textMuted}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Generate Maze
              </span>
              <button onClick={() => setIsOpen(false)} className={`text-xs ${colors.textMuted} px-2 py-1 rounded`}>
                Close
              </button>
            </div>
            <div className="p-2 pb-6">
              {algoEntries.map((algo) => {
                const info = MAZE_INFO[algo];
                return (
                  <button
                    key={algo}
                    onClick={() => generateMaze(algo)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-150 ${colors.surfaceHover} group active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-base font-medium ${colors.text} group-hover:text-violet-400 transition-colors`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {info.name}
                        </div>
                        <div className={`text-xs ${colors.textMuted} mt-0.5 leading-relaxed`}>
                          {info.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
