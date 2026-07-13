export function recursiveBacktracker(rows, cols, start, end) {
  const wallSet = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        if (!(r === start.row && c === start.col) && !(r === end.row && c === end.col)) {
          wallSet.add(`${r},${c}`);
        }
      } else {
        wallSet.add(`${r},${c}`);
      }
    }
  }

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const passages = new Set();

  const sr = start.row % 2 === 0 ? start.row + 1 : start.row;
  const sc = start.col % 2 === 0 ? start.col + 1 : start.col;
  const clampedSr = Math.min(sr, rows - 2);
  const clampedSc = Math.min(sc, cols - 2);

  const stack = [{ row: clampedSr, col: clampedSc }];
  visited[clampedSr][clampedSc] = true;
  passages.add(`${clampedSr},${clampedSc}`);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = [];

    const dirs = [[-2, 0], [2, 0], [0, -2], [0, 2]];
    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && !visited[nr][nc]) {
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
    passages.add(`${passageRow},${passageCol}`);
    passages.add(`${chosen.row},${chosen.col}`);

    stack.push({ row: chosen.row, col: chosen.col });
  }

  passages.add(`${start.row},${start.col}`);
  passages.add(`${end.row},${end.col}`);

  passages.forEach((p) => wallSet.delete(p));

  return Array.from(wallSet).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}
