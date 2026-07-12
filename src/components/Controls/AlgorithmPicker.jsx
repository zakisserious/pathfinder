import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { useCompare } from '../../context/CompareContext';
import { ALGORITHMS, ALGORITHM_INFO, ALGORITHM_COLORS } from '../../utils/constants';

export function AlgorithmPicker() {
  const { colors } = useTheme();
  const { selectedAlgorithm, setSelectedAlgorithm, isRunning } = useGrid();
  const { isCompareMode, selectedAlgorithms, toggleAlgorithm } = useCompare();

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-medium ${colors.textMuted} uppercase tracking-[0.15em]`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          01
        </span>
        <h3 className={`text-xs font-semibold ${colors.textSecondary} uppercase tracking-wider`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {isCompareMode ? 'Select Algorithms' : 'Algorithm'}
        </h3>
        {isCompareMode && (
          <span className={`text-[10px] ${colors.textMuted}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {selectedAlgorithms.length} selected
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
        {Object.values(ALGORITHMS).map((algo) => {
          const info = ALGORITHM_INFO[algo];
          const algoColors = ALGORITHM_COLORS[algo];
          const isSelected = isCompareMode
            ? selectedAlgorithms.includes(algo)
            : selectedAlgorithm === algo;

          return (
            <button
              key={algo}
              onClick={() => {
                if (isRunning) return;
                if (isCompareMode) {
                  toggleAlgorithm(algo);
                } else {
                  setSelectedAlgorithm(algo);
                }
              }}
              disabled={isRunning}
              className={`relative px-2.5 py-2.5 text-left rounded-xl border transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 group ${
                isSelected
                  ? `${colors.cardActive}`
                  : `${colors.card} hover:border-[#334155]`
              }`}
            >
              {isSelected && isCompareMode && (
                <div className="absolute top-1.5 right-1.5">
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center`}
                    style={{ backgroundColor: algoColors.hex }}>
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              {isSelected && !isCompareMode && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
              )}
              <div
                className={`text-sm font-bold ${isSelected ? (isCompareMode ? algoColors.label : 'text-violet-400') : colors.text} transition-colors`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {info.shortName}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-1 h-1 rounded-full ${info.guaranteesShortest ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span className={`text-[9px] ${colors.textMuted}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {info.guaranteesShortest ? 'optimal' : 'fast'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
