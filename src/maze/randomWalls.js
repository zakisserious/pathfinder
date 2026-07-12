export function randomWalls(rows, cols, start, end, density = 0.3) {
  const walls = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === start.row && c === start.col) continue;
      if (r === end.row && c === end.col) continue;
      if (Math.random() < density) {
        walls.push({ row: r, col: c });
      }
    }
  }
  return walls;
}
