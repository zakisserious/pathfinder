import { useTheme } from '../../context/ThemeContext';

export function Modal({ isOpen, onClose, children }) {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${colors.overlay}`} onClick={onClose}>
      <div
        className={`relative w-full max-w-sm p-6 rounded-2xl border shadow-2xl ${colors.tutorial}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
