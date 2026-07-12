import { useTheme } from '../../context/ThemeContext';

export function Legend() {
  const { colors } = useTheme();

  const items = [
    { color: colors.cell.start, label: 'Start', icon: '▶' },
    { color: colors.cell.end, label: 'End', icon: '◉' },
    { color: colors.cell.wall, label: 'Wall', icon: '■' },
    { color: colors.cell.visited, label: 'Visited', icon: '◆' },
    { color: colors.cell.frontier, label: 'Frontier', icon: '◇' },
    { color: colors.cell.path, label: 'Path', icon: '★' },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-2`}>
      {items.map(({ color, label, icon }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
          <span
            className={`text-[10px] ${colors.textMuted}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
