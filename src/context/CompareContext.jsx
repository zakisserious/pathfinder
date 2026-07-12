import { createContext, useContext, useState, useCallback } from 'react';
import { ALGORITHMS } from '../utils/constants';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([
    ALGORITHMS.ASTAR,
    ALGORITHMS.DIJKSTRA,
    ALGORITHMS.BFS,
  ]);
  const [isRacing, setIsRacing] = useState(false);
  const [raceResults, setRaceResults] = useState([]);

  const toggleAlgorithm = useCallback((algo) => {
    setSelectedAlgorithms((prev) => {
      if (prev.includes(algo)) {
        if (prev.length <= 2) return prev;
        return prev.filter((a) => a !== algo);
      }
      return [...prev, algo];
    });
  }, []);

  const addRaceResult = useCallback((result) => {
    setRaceResults((prev) => [...prev, result]);
  }, []);

  const clearResults = useCallback(() => {
    setRaceResults([]);
  }, []);

  const exitCompareMode = useCallback(() => {
    setIsCompareMode(false);
    setIsRacing(false);
    setRaceResults([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        isCompareMode,
        setIsCompareMode,
        selectedAlgorithms,
        setSelectedAlgorithms,
        toggleAlgorithm,
        isRacing,
        setIsRacing,
        raceResults,
        addRaceResult,
        clearResults,
        exitCompareMode,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within CompareProvider');
  return context;
}
