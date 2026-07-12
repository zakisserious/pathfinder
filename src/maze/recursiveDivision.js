export function recursiveDivision(grid, start, end) {
  const walls = [];
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        if (!(r === start.row && c === start.col) && !(r === end.row && c === end.col)) {
          walls.push({ row: r, col: c });
        }
      }
    }
  }

  divide(walls, 1, 1, cols - 2, rows - 2, chooseOrientation(cols - 2, rows - 2), start, end);

  return walls;
}

function divide(walls, x, y, width, height, orientation, start, end) {
  if (width < 2 || height < 2) return;

  const horizontal = orientation === 'horizontal';

  let wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 1)));
  let wy = y + (horizontal ? Math.floor(Math.random() * (height - 1)) : 0);

  const dx = horizontal ? 1 : 0;
  const dy = horizontal ? 0 : 1;

  const length = horizontal ? width : height;
  const wallLength = Math.floor(Math.random() * 2) + 1;

  for (let i = 0; i < length - wallLength; i++) {
    if (!(wx === start.row && wy === start.col) && !(wx === end.row && wy === end.col)) {
      walls.push({ row: wx, col: wy });
    }
    wx += dx;
    wy += dy;
  }

  const nx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 1)));
  const ny = y + (horizontal ? Math.floor(Math.random() * (height - 1)) : 0);

  const passageX = x + (horizontal ? Math.floor(Math.random() * width) : 0);
  const passageY = y + (horizontal ? 0 : Math.floor(Math.random() * height));

  divide(walls, x, y, horizontal ? width : passageX - x, horizontal ? passageY - y : height, chooseOrientation(horizontal ? width : passageX - x, horizontal ? passageY - y : height), start, end);
  divide(
    walls,
    horizontal ? x : passageX + 1,
    horizontal ? passageY + 1 : y,
    horizontal ? width : x + width - passageX - 1,
    horizontal ? y + height - passageY - 1 : height,
    chooseOrientation(horizontal ? width : x + width - passageX - 1, horizontal ? y + height - passageY - 1 : height),
    start,
    end
  );
}

function chooseOrientation(width, height) {
  if (width < height) return 'horizontal';
  if (height < width) return 'vertical';
  return Math.random() > 0.5 ? 'horizontal' : 'vertical';
}
