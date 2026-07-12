export function bfs(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const queue = [start];
  visited[start.row][start.col] = true;
  let explored = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    explored++;

    steps.push({
      type: 'visit',
      row: current.row,
      col: current.col,
      g: 0,
      h: 0,
      f: 0,
    });

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(parent, end);
      return { steps, path, nodesExplored: explored };
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
      if (grid[nr][nc].isWall || visited[nr][nc]) continue;

      visited[nr][nc] = true;
      parent[nr][nc] = { row: current.row, col: current.col };
      queue.push({ row: nr, col: nc });

      steps.push({
        type: 'frontier',
        row: nr,
        col: nc,
        g: 0,
        h: 0,
        f: 0,
      });
    }
  }

  return { steps, path: [], nodesExplored: explored };
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
