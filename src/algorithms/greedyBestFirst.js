import { manhattanDistance } from '../utils/helpers';

export function greedyBestFirst(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const openSet = [];

  const h = manhattanDistance(start.row, start.col, end.row, end.col);
  openSet.push({ row: start.row, col: start.col, h });

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.h - b.h);
    const current = openSet.shift();
    const key = `${current.row},${current.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    steps.push({
      type: 'visit',
      row: current.row,
      col: current.col,
      g: 0,
      h: manhattanDistance(current.row, current.col, end.row, end.col),
      f: manhattanDistance(current.row, current.col, end.row, end.col),
    });

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(parent, end);
      return { steps, path, nodesExplored: visited.size };
    }

    const neighbors = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dr, dc] of neighbors) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc].isWall) continue;
      const nKey = `${nr},${nc}`;
      if (visited.has(nKey)) continue;

      parent[nr][nc] = { row: current.row, col: current.col };
      const hVal = manhattanDistance(nr, nc, end.row, end.col);
      openSet.push({ row: nr, col: nc, h: hVal });

      steps.push({
        type: 'frontier',
        row: nr,
        col: nc,
        g: 0,
        h: hVal,
        f: hVal,
      });
    }
  }

  return { steps, path: [], nodesExplored: visited.size };
}

function reconstructPath(parent, end) {
  const path = [];
  let current = { row: end.row, col: end.col };
  while (current) {
    path.unshift(current);
    current = parent[current.row][current.col];
  }
  return path;
}
