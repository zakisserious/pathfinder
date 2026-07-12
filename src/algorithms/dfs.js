export function dfs(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  let explored = 0;
  let found = false;

  function dfsRecursive(row, col) {
    if (found) return;
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (visited[row][col] || grid[row][col].isWall) return;

    visited[row][col] = true;
    explored++;

    steps.push({
      type: 'visit',
      row,
      col,
      g: 0,
      h: 0,
      f: 0,
    });

    if (row === end.row && col === end.col) {
      found = true;
      return;
    }

    const neighbors = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dr, dc] of neighbors) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !grid[nr][nc].isWall) {
        parent[nr][nc] = { row, col };
        steps.push({
          type: 'frontier',
          row: nr,
          col: nc,
          g: 0,
          h: 0,
          f: 0,
        });
        dfsRecursive(nr, nc);
        if (found) return;
      }
    }
  }

  dfsRecursive(start.row, start.col);

  const path = found ? reconstructPath(parent, end) : [];
  return { steps, path, nodesExplored: explored };
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
