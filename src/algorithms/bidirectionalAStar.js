import { manhattanDistance } from '../utils/helpers';

export function bidirectionalAStar(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const openStart = [];
  const openEnd = [];
  const visitedStart = new Set();
  const visitedEnd = new Set();
  const gStart = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const gEnd = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parentStart = Array.from({ length: rows }, () => Array(cols).fill(null));
  const parentEnd = Array.from({ length: rows }, () => Array(cols).fill(null));

  gStart[start.row][start.col] = 0;
  gEnd[end.row][end.col] = 0;
  openStart.push({ row: start.row, col: start.col, f: manhattanDistance(start.row, start.col, end.row, end.col) });
  openEnd.push({ row: end.row, col: end.col, f: manhattanDistance(end.row, end.col, start.row, start.col) });

  let meetingPoint = null;
  let bestCost = Infinity;
  let explored = 0;

  function expand(openSet, visited, gScore, parent, otherVisited, target) {
    if (openSet.length === 0) return false;
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    const key = `${current.row},${current.col}`;
    if (visited.has(key)) return false;
    visited.add(key);
    explored++;

    steps.push({
      type: 'visit',
      row: current.row,
      col: current.col,
      g: gScore[current.row][current.col],
      h: manhattanDistance(current.row, current.col, target.row, target.col),
      f: current.f,
    });

    if (otherVisited.has(key)) {
      const totalCost = gScore[current.row][current.col] + gEnd[current.row][current.col];
      if (totalCost < bestCost) {
        bestCost = totalCost;
        meetingPoint = { row: current.row, col: current.col };
      }
    }

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
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
        openSet.push({ row: nr, col: nc, f: tentativeG + manhattanDistance(nr, nc, target.row, target.col) });

        steps.push({
          type: 'frontier',
          row: nr,
          col: nc,
          g: tentativeG,
          h: manhattanDistance(nr, nc, target.row, target.col),
          f: tentativeG + manhattanDistance(nr, nc, target.row, target.col),
        });
      }
    }
    return true;
  }

  const maxIterations = rows * cols * 2;
  let iter = 0;
  while ((openStart.length > 0 || openEnd.length > 0) && iter < maxIterations) {
    iter++;
    const expandedS = expand(openStart, visitedStart, gStart, parentStart, visitedEnd, end);
    const expandedE = expand(openEnd, visitedEnd, gEnd, parentEnd, visitedStart, start);

    if (meetingPoint && !expandedS && !expandedE) break;
    if (meetingPoint && iter > 10 && !expandedS && !expandedE) break;
  }

  let path = [];
  if (meetingPoint) {
    const pathFromStart = reconstructPath(parentStart, meetingPoint);
    const pathFromEnd = reconstructPath(parentEnd, meetingPoint);
    pathFromEnd.reverse();
    pathFromEnd.shift();
    path = [...pathFromStart, ...pathFromEnd];
  }

  return { steps, path, nodesExplored: explored };
}

function reconstructPath(parent, target) {
  const path = [];
  let current = { row: target.row, col: target.col };
  while (current) {
    path.unshift(current);
    current = parent[current.row][current.col];
  }
  return path;
}
