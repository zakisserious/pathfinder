export function calculateGridSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const TARGET_RATIO = 1.5;

  let cellSize, padding;

  if (isMobile) {
    cellSize = 18;
    padding = 4;
  } else if (isTablet) {
    cellSize = 26;
    padding = 12;
  } else {
    cellSize = 32;
    padding = 16;
  }

  const chromeHeight = isMobile ? 76 : 88;
  const availableWidth = width - padding * 2 - 2;
  const availableHeight = height - chromeHeight;

  let cols = Math.floor(availableWidth / cellSize);
  let rows = Math.floor(cols / TARGET_RATIO);

  if (rows * cellSize > availableHeight) {
    rows = Math.floor(availableHeight / cellSize);
    cols = Math.floor(rows * TARGET_RATIO);
  }

  return {
    rows: Math.max(6, Math.min(rows, 50)),
    cols: Math.max(6, Math.min(cols, 80)),
    cellSize,
  };
}

export function createEmptyGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        isWall: false,
        isVisited: false,
        isPath: false,
        isFrontier: false,
        distance: Infinity,
        heuristic: 0,
        totalCost: Infinity,
        parent: null,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function getDefaultStartEnd(rows, cols) {
  const startRow = Math.floor(rows / 2);
  const startCol = Math.max(1, Math.floor(cols * 0.2));
  const endRow = Math.floor(rows / 2);
  const endCol = Math.min(cols - 2, Math.floor(cols * 0.8));
  return {
    start: { row: startRow, col: startCol },
    end: { row: endRow, col: endCol },
  };
}

export function resetGridState(grid) {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      isVisited: false,
      isPath: false,
      isFrontier: false,
      distance: Infinity,
      heuristic: 0,
      totalCost: Infinity,
      parent: null,
    }))
  );
}

export function manhattanDistance(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

export function euclideanDistance(r1, c1, r2, c2) {
  return Math.sqrt((r1 - r2) ** 2 + (c1 - c2) ** 2);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
