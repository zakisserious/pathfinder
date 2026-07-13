export function iddfs(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  let explored = 0;
  const maxDepth = rows + cols;

  for (let depth = 0; depth <= maxDepth; depth++) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
    const found = dfsLimit(start, end, depth, visited, parent, grid, rows, cols, steps, () => { explored++; });

    if (found) {
      return { steps, path: reconstructPath(parent, end), nodesExplored: explored };
    }
  }

  return { steps, path: [], nodesExplored: explored };
}

function dfsLimit(node, end, depth, visited, parent, grid, rows, cols, steps, countFn) {
  if (depth === 0) {
    if (node.row === end.row && node.col === end.col) return true;
    return false;
  }

  visited[node.row][node.col] = true;
  countFn();

  steps.push({
    type: 'visit',
    row: node.row,
    col: node.col,
    g: depth,
    h: 0,
    f: 0,
  });

  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of dirs) {
    const nr = node.row + dr;
    const nc = node.col + dc;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
    if (grid[nr][nc].isWall || visited[nr][nc]) continue;

    steps.push({
      type: 'frontier',
      row: nr,
      col: nc,
      g: depth - 1,
      h: 0,
      f: 0,
    });

    parent[nr][nc] = { row: node.row, col: node.col };

    if (dfsLimit({ row: nr, col: nc }, end, depth - 1, visited, parent, grid, rows, cols, steps, countFn)) {
      return true;
    }

    parent[nr][nc] = null;
  }

  return false;
}

function reconstructPath(parent, end) {
  const path = [];
  let current = { row: end.row, col: end.col };
  while (current) {
    path.unshift(current);
    current = parent[current.row]?.[current.col];
  }
  return path;
}
