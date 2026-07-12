import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { ALGORITHM_INFO } from '../../utils/constants';

export function MetricsPanel() {
  const { colors } = useTheme();
  const { metrics, hasRun, selectedAlgorithm } = useGrid();

  const info = ALGORITHM_INFO[selectedAlgorithm];

  if (!hasRun) return null;

  const items = [
    { label: 'explored', value: metrics.nodesExplored.toLocaleString(), color: 'text-cyan-400' },
    { label: 'path', value: `${metrics.pathLength}`, color: 'text-amber-400' },
    { label: 'time', value: `${metrics.time}ms`, color: 'text-violet-400' },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 rounded-lg ${colors.surface} border ${colors.border}`}>
      {items.map(({ label, value, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span
            className={`text-[10px] ${colors.textMuted}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {label}
          </span>
          <span
            className={`text-xs font-bold ${color}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
