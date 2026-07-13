export function recursiveDivision(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const walls = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        if (!(r === start.row && c === start.col) && !(r === end.row && c === end.col)) {
          walls.add(`${r},${c}`);
        }
      }
    }
  }

  divide(walls, 1, 1, cols - 2, rows - 2, start, end, rows, cols);

  return Array.from(walls).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}

function divide(walls, left, top, right, bottom, start, end, rows, cols) {
  const width = right - left + 1;
  const height = bottom - top + 1;

  if (width < 3 || height < 3) return;

  const horizontal = height > width ? true : width > height ? false : Math.random() > 0.5;

  if (horizontal) {
    const possibleRows = [];
    for (let r = top + 1; r < bottom; r += 2) possibleRows.push(r);
    if (possibleRows.length === 0) return;
    const wallRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

    const possibleCols = [];
    for (let c = left; c <= right; c += 1) possibleCols.push(c);
    const passageCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

    for (let c = left; c <= right; c++) {
      if (c === passageCol) continue;
      if (wallRow === start.row && c === start.col) continue;
      if (wallRow === end.row && c === end.col) continue;
      walls.add(`${wallRow},${c}`);
    }

    divide(walls, left, top, right, wallRow - 1, start, end, rows, cols);
    divide(walls, left, wallRow + 1, right, bottom, start, end, rows, cols);
  } else {
    const possibleCols = [];
    for (let c = left + 1; c < right; c += 2) possibleCols.push(c);
    if (possibleCols.length === 0) return;
    const wallCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

    const possibleRows = [];
    for (let r = top; r <= bottom; r += 1) possibleRows.push(r);
    const passageRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

    for (let r = top; r <= bottom; r++) {
      if (r === passageRow) continue;
      if (r === start.row && wallCol === start.col) continue;
      if (r === end.row && wallCol === end.col) continue;
      walls.add(`${r},${wallCol}`);
    }

    divide(walls, left, top, wallCol - 1, bottom, start, end, rows, cols);
    divide(walls, wallCol + 1, top, right, bottom, start, end, rows, cols);
  }
}
