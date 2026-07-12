import { useTheme } from '../../context/ThemeContext';
import { ALGORITHM_INFO, ALGORITHMS } from '../../utils/constants';

export function ComparisonTable({ results }) {
  const { colors } = useTheme();

  if (!results || results.length === 0) return null;

  const shortestPath = Math.min(...results.filter((r) => r.pathLength > 0).map((r) => r.pathLength));
  const fewestExplored = Math.min(...results.map((r) => r.nodesExplored));
  const fastest = Math.min(...results.map((r) => r.time));

  return (
    <div className={`w-full overflow-x-auto rounded-xl border ${colors.card}`}>
      <table className="w-full text-left" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <thead>
          <tr className={`border-b ${colors.border}`}>
            <th className={`px-3 py-2 text-[10px] font-medium ${colors.textMuted} uppercase tracking-wider`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Algorithm
            </th>
            <th className={`px-3 py-2 text-[10px] font-medium ${colors.textMuted} uppercase tracking-wider text-right`}>
              Explored
            </th>
            <th className={`px-3 py-2 text-[10px] font-medium ${colors.textMuted} uppercase tracking-wider text-right`}>
              Path
            </th>
            <th className={`px-3 py-2 text-[10px] font-medium ${colors.textMuted} uppercase tracking-wider text-right`}>
              Time
            </th>
            <th className={`px-3 py-2 text-[10px] font-medium ${colors.textMuted} uppercase tracking-wider text-center`}>
              Optimal
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            const info = ALGORITHM_INFO[result.algorithm];
            const isShortestPath = result.pathLength === shortestPath && result.pathLength > 0;
            const isFewestExplored = result.nodesExplored === fewestExplored;
            const isFastest = result.time === fastest;

            return (
              <tr key={result.algorithm} className={`border-b ${colors.border} last:border-b-0`}>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: result.color }} />
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {info.shortName}
                    </span>
                  </div>
                </td>
                <td className={`px-3 py-2 text-xs text-right ${isFewestExplored ? 'text-emerald-400 font-bold' : colors.text}`}>
                  {result.nodesExplored.toLocaleString()}
                </td>
                <td className={`px-3 py-2 text-xs text-right ${isShortestPath ? 'text-emerald-400 font-bold' : colors.text}`}>
                  {result.pathLength > 0 ? result.pathLength : '—'}
                </td>
                <td className={`px-3 py-2 text-xs text-right ${isFastest ? 'text-emerald-400 font-bold' : colors.text}`}>
                  {result.time}ms
                </td>
                <td className="px-3 py-2 text-center">
                  {info.guaranteesShortest ? (
                    <span className="text-emerald-400 text-xs">✓</span>
                  ) : (
                    <span className="text-rose-400 text-xs">✗</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
