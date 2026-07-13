import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useGrid } from '../../context/GridContext';
import { ALGORITHM_INFO } from '../../utils/constants';

const KEYWORDS = new Set([
  'function', 'for', 'if', 'else', 'while', 'return', 'and', 'or', 'not', 'in', 'to', 'true', 'false',
]);

function highlightPseudocode(lines) {
  return lines.map((line, i) => {
    if (line === '') return <br key={i} />;

    const commentIdx = line.indexOf('//');
    let code = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    let comment = commentIdx >= 0 ? line.slice(commentIdx) : '';

    const parts = [];
    const tokens = code.split(/(\s+|[(),:=+\[\]{}.!?])/);
    for (let j = 0; j < tokens.length; j++) {
      const t = tokens[j];
      if (!t) continue;
      if (KEYWORDS.has(t)) {
        parts.push(<span key={`${i}-${j}`} className="pseudo-kw">{t}</span>);
      } else if (/^\d/.test(t)) {
        parts.push(<span key={`${i}-${j}`} className="pseudo-number">{t}</span>);
      } else {
        parts.push(t);
      }
    }

    return (
      <div key={i} className="pseudocode-line">
        <span className="pseudocode-linenum">{String(i + 1).padStart(2, ' ')}</span>
        <span>{parts}</span>
        {comment && <span className="pseudo-comment">{comment}</span>}
      </div>
    );
  });
}

export function AlgorithmInfo() {
  const { colors } = useTheme();
  const { selectedAlgorithm } = useGrid();
  const [showCode, setShowCode] = useState(false);
  const info = ALGORITHM_INFO[selectedAlgorithm];

  if (!info) return null;

  return (
    <div className={`rounded-xl border overflow-hidden ${colors.terminal} transition-all duration-300`}>
      {/* Terminal header */}
      <div className={`flex items-center gap-2 px-3 py-2 ${colors.terminalHeader}`}>
        <div className={`w-2 h-2 rounded-full ${colors.terminalDot}`} />
        <div className={`w-2 h-2 rounded-full ${colors.terminalDot}`} />
        <div className={`w-2 h-2 rounded-full ${colors.terminalDot}`} />
        <span
          className={`ml-2 text-[10px] ${colors.textMuted}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          algorithm.info
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-3 sm:p-4 space-y-3">
        <div>
          <div
            className={`text-[10px] ${colors.textMuted} mb-1`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {'>'} name
          </div>
          <h3
            className={`text-base sm:text-lg font-bold ${colors.text}`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {info.name}
          </h3>
        </div>

        <p className={`text-xs ${colors.textSecondary} leading-relaxed`}>
          {info.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${colors.badgeViolet}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            T: {info.timeComplexity}
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${colors.badgeInfo}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            M: {info.spaceComplexity}
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${info.weighted ? colors.badgeWarning : colors.badge}`}>
            {info.weighted ? 'weighted' : 'unweighted'}
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${info.guaranteesShortest ? colors.badgeSuccess : colors.badgeDanger}`}>
            {info.guaranteesShortest ? 'shortest path' : 'no guarantee'}
          </span>
        </div>

        {info.howItWorks && (
          <div>
            <div
              className={`text-[10px] ${colors.textMuted} mb-1`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {'>'} how_it_works
            </div>
            <p className={`text-[11px] ${colors.textSecondary} leading-relaxed`}>
              {info.howItWorks}
            </p>
          </div>
        )}

        <div>
          <div
            className={`text-[10px] ${colors.textMuted} mb-1`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {'>'} best_for
          </div>
          <p className={`text-[11px] ${colors.textMuted} leading-relaxed`}>
            {info.bestFor}
          </p>
        </div>

        {info.pseudocode && (
          <div>
            <button
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center gap-1.5 text-[10px] ${colors.textMuted} hover:text-violet-400 transition-colors cursor-pointer`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className={`transition-transform duration-200 ${showCode ? 'rotate-90' : ''}`}>{'>'}</span>
              {showCode ? 'hide' : 'cat'} pseudocode
            </button>

            {showCode && (
              <div className="pseudocode-block mt-2">
                {highlightPseudocode(info.pseudocode)}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-1">
          <span className="terminal-cursor" />
          <span
            className={`text-[10px] ${colors.textMuted}`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ready
          </span>
        </div>
      </div>
    </div>
  );
}
