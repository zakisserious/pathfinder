import { manhattanDistance } from '../utils/helpers';

export function astar(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const openSet = [];
  const visited = new Set();
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

  gScore[start.row][start.col] = 0;
  fScore[start.row][start.col] = manhattanDistance(start.row, start.col, end.row, end.col);
  openSet.push({ row: start.row, col: start.col, f: fScore[start.row][start.col] });

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    const key = `${current.row},${current.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    steps.push({
      type: 'visit',
      row: current.row,
      col: current.col,
      g: gScore[current.row][current.col],
      h: manhattanDistance(current.row, current.col, end.row, end.col),
      f: fScore[current.row][current.col],
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

      const tentativeG = gScore[current.row][current.col] + 1;
      if (tentativeG < gScore[nr][nc]) {
        parent[nr][nc] = { row: current.row, col: current.col };
        gScore[nr][nc] = tentativeG;
        fScore[nr][nc] = tentativeG + manhattanDistance(nr, nc, end.row, end.col);
        openSet.push({ row: nr, col: nc, f: fScore[nr][nc] });

        steps.push({
          type: 'frontier',
          row: nr,
          col: nc,
          g: gScore[nr][nc],
          h: manhattanDistance(nr, nc, end.row, end.col),
          f: fScore[nr][nc],
        });
      }
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
