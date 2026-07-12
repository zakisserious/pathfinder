import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';

const STEPS = [
  {
    title: 'Draw walls',
    description: 'Click or drag anywhere on the grid to place walls. Build your own maze or use a preset.',
    icon: '◼',
    accent: 'text-slate-400',
  },
  {
    title: 'Place markers',
    description: 'Drag the green start ▶ and rose end ◉ to reposition them anywhere on the grid.',
    icon: '⬡',
    accent: 'text-emerald-400',
  },
  {
    title: 'Pick an algorithm',
    description: 'Choose from 6 pathfinding algorithms. Each card shows whether it\'s optimal or fast.',
    icon: '⟐',
    accent: 'text-violet-400',
  },
  {
    title: 'Watch it solve',
    description: 'Hit Run and observe the algorithm expand. Toggle f/g/h to see the cost values on each cell.',
    icon: '◎',
    accent: 'text-cyan-400',
  },
  {
    title: 'Compare results',
    description: 'Run different algorithms on the same maze. The metrics panel shows explored nodes, path length, and time.',
    icon: '⊞',
    accent: 'text-amber-400',
  },
];

export function Tutorial() {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('pathfinding-tutorial-seen');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('pathfinding-tutorial-seen', 'true');
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = STEPS[currentStep];

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center">
        <div
          className={`text-3xl mb-3 ${step.accent}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {step.icon}
        </div>
        <h3
          className={`text-lg font-bold ${colors.text} mb-2`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {step.title}
        </h3>
        <p className={`text-sm ${colors.textSecondary} mb-5 leading-relaxed max-w-xs mx-auto`}>
          {step.description}
        </p>

        {/* Step indicators */}
        <div className="flex justify-center gap-1.5 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentStep ? 'w-6 bg-violet-500' : `w-1.5 ${colors.toggle}`
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between gap-2">
          <Button onClick={handlePrev} variant="secondary" size="sm" disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={handleClose} variant="secondary" size="sm">
            Skip
          </Button>
          <Button onClick={handleNext} variant="primary" size="sm">
            {currentStep === STEPS.length - 1 ? 'Start' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
