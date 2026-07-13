import { manhattanDistance } from '../utils/helpers';

export function jumpPointSearch(grid, start, end) {
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

  function jump(r, c, dr, dc) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return null;
    if (grid[nr][nc].isWall) return null;

    const key = `${nr},${nc}`;
    if (!visited.has(key)) {
      steps.push({ type: 'frontier', row: nr, col: nc, g: gScore[nr]?.[nc] ?? 0, h: manhattanDistance(nr, nc, end.row, end.col), f: 0 });
    }

    if (nr === end.row && nc === end.col) return { row: nr, col: nc };

    if (dr !== 0) {
      if ((nr > 0 && grid[nr - 1][nc]?.isWall && !grid[nr - 1][nc + dc]?.isWall && nc + dc >= 0 && nc + dc < cols) ||
          (nr < rows - 1 && grid[nr + 1][nc]?.isWall && !grid[nr + 1][nc + dc]?.isWall && nc + dc >= 0 && nc + dc < cols)) {
        return { row: nr, col: nc };
      }
    }
    if (dc !== 0) {
      if ((nc > 0 && grid[nr][nc - 1]?.isWall && !grid[nr + dr]?.[nc - 1]?.isWall && nr + dr >= 0 && nr + dr < rows) ||
          (nc < cols - 1 && grid[nr][nc + 1]?.isWall && !grid[nr + dr]?.[nc + 1]?.isWall && nr + dr >= 0 && nr + dr < rows)) {
        return { row: nr, col: nc };
      }
    }

    if (dr !== 0 && dc !== 0) {
      const j1 = jump(nr, nc, dr, 0);
      if (j1) return { row: nr, col: nc };
      const j2 = jump(nr, nc, 0, dc);
      if (j2) return { row: nr, col: nc };
    }

    return jump(nr, nc, dr, dc);
  }

  function identifySuccessors(node) {
    const successors = [];
    const neighbors = [];

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const nr = node.row + dr;
      const nc = node.col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].isWall) {
        neighbors.push([dr, dc]);
      }
    }

    for (const [dr, dc] of neighbors) {
      const jp = jump(node.row, node.col, dr, dc);
      if (jp) {
        successors.push(jp);
      }
    }

    return successors;
  }

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    const key = `${current.row},${current.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    steps.push({ type: 'visit', row: current.row, col: current.col, g: gScore[current.row][current.col], h: manhattanDistance(current.row, current.col, end.row, end.col), f: fScore[current.row][current.col] });

    if (current.row === end.row && current.col === end.col) {
      return { steps, path: reconstructPath(parent, end), nodesExplored: visited.size };
    }

    const successors = identifySuccessors(current);
    for (const s of successors) {
      const sKey = `${s.row},${s.col}`;
      if (visited.has(sKey)) continue;

      const tentativeG = gScore[current.row][current.col] + manhattanDistance(current.row, current.col, s.row, s.col);
      if (tentativeG < gScore[s.row][s.col]) {
        parent[s.row][s.col] = { row: current.row, col: current.col };
        gScore[s.row][s.col] = tentativeG;
        fScore[s.row][s.col] = tentativeG + manhattanDistance(s.row, s.col, end.row, end.col);
        openSet.push({ row: s.row, col: s.col, f: fScore[s.row][s.col] });
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
