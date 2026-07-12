export function dijkstra(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const visited = new Set();
  const pq = [];

  dist[start.row][start.col] = 0;
  pq.push({ row: start.row, col: start.col, dist: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const current = pq.shift();
    const key = `${current.row},${current.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    steps.push({
      type: 'visit',
      row: current.row,
      col: current.col,
      g: dist[current.row][current.col],
      h: 0,
      f: dist[current.row][current.col],
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

      const newDist = dist[current.row][current.col] + 1;
      if (newDist < dist[nr][nc]) {
        parent[nr][nc] = { row: current.row, col: current.col };
        dist[nr][nc] = newDist;
        pq.push({ row: nr, col: nc, dist: newDist });

        steps.push({
          type: 'frontier',
          row: nr,
          col: nc,
          g: dist[nr][nc],
          h: 0,
          f: dist[nr][nc],
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
