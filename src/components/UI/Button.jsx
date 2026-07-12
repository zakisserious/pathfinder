import { useTheme } from '../../context/ThemeContext';

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }) {
  const { colors } = useTheme();

  const variants = {
    primary: colors.button,
    secondary: colors.buttonSecondary,
    danger: colors.buttonDanger,
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs rounded-lg',
    md: 'px-3.5 py-1.5 text-xs rounded-lg',
    lg: 'px-5 py-2.5 text-sm rounded-xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap ${className}`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {children}
    </button>
  );
}
