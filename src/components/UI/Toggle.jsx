import { useTheme } from '../../context/ThemeContext';

export function Toggle({ checked, onChange, label }) {
  const { colors } = useTheme();

  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-200 cursor-pointer ${checked ? colors.toggleActive : colors.toggle}`}
      aria-label={label}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full transition-all duration-200 ${colors.toggleDot} shadow-sm ${
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
}
