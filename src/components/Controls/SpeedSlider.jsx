import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { SPEEDS } from '../../utils/constants';

export function SpeedSlider() {
  const { colors } = useTheme();
  const { speed, setSpeed, isRunning } = useGrid();

  const speedKeys = Object.keys(SPEEDS);
  const currentIndex = speedKeys.findIndex((key) => SPEEDS[key].delay === speed.delay);

  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value);
    setSpeed(SPEEDS[speedKeys[index]]);
  };

  const progress = (currentIndex / (speedKeys.length - 1)) * 100;

  return (
    <div className="flex items-center gap-2.5">
      <svg className={`w-3.5 h-3.5 ${colors.textMuted} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3m3 0h3m3 0h3m3 0h3" />
      </svg>
      <input
        type="range"
        min={0}
        max={speedKeys.length - 1}
        value={currentIndex}
        onChange={handleSliderChange}
        disabled={isRunning}
        className="w-20 sm:w-24"
        style={{ '--progress': `${progress}%` }}
      />
      <span
        className={`text-[10px] ${colors.textMuted} w-12 text-right flex-shrink-0`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {speed.label}
      </span>
    </div>
  );
}
