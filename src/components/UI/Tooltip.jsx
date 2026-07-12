import { useTheme } from '../../context/ThemeContext';

export function Tooltip({ children, text }) {
  const { colors } = useTheme();

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${colors.tooltip} border`}
      >
        {text}
      </div>
    </div>
  );
}
