export function recursiveBacktracker(rows, cols, start, end) {
  const walls = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!(r === start.row && c === start.col) && !(r === end.row && c === end.col)) {
        walls.push({ row: r, col: c });
      }
    }
  }

  const passages = [];
  const stack = [{ row: start.row, col: start.col }];
  visited[start.row][start.col] = true;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = [];

    const dirs = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        neighbors.push({ row: nr, col: nc, dr, dc });
      }
    }

    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }

    const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
    visited[chosen.row][chosen.col] = true;

    const passageRow = current.row + chosen.dr / 2;
    const passageCol = current.col + chosen.dc / 2;
    passages.push({ row: passageRow, col: passageCol });
    passages.push({ row: chosen.row, col: chosen.col });

    stack.push({ row: chosen.row, col: chosen.col });
  }

  const wallSet = new Set(walls.map((w) => `${w.row},${w.col}`));
  passages.forEach((p) => {
    wallSet.delete(`${p.row},${p.col}`);
  });

  return Array.from(wallSet).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}
