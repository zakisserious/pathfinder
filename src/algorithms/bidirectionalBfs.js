export function bidirectionalBfs(grid, start, end) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const visitedStart = Array.from({ length: rows }, () => Array(cols).fill(false));
  const visitedEnd = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parentStart = Array.from({ length: rows }, () => Array(cols).fill(null));
  const parentEnd = Array.from({ length: rows }, () => Array(cols).fill(null));
  const queueStart = [start];
  const queueEnd = [end];
  visitedStart[start.row][start.col] = true;
  visitedEnd[end.row][end.col] = true;
  let explored = 0;
  let meetingPoint = null;

  while (queueStart.length > 0 && queueEnd.length > 0) {
    if (queueStart.length > 0) {
      const current = queueStart.shift();
      explored++;

      steps.push({
        type: 'visit',
        row: current.row,
        col: current.col,
        g: 0,
        h: 0,
        f: 0,
      });

      if (visitedEnd[current.row][current.col]) {
        meetingPoint = { row: current.row, col: current.col };
        break;
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
        if (grid[nr][nc].isWall || visitedStart[nr][nc]) continue;

        visitedStart[nr][nc] = true;
        parentStart[nr][nc] = { row: current.row, col: current.col };
        queueStart.push({ row: nr, col: nc });

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

    if (queueEnd.length > 0) {
      const current = queueEnd.shift();
      explored++;

      steps.push({
        type: 'visit',
        row: current.row,
        col: current.col,
        g: 0,
        h: 0,
        f: 0,
      });

      if (visitedStart[current.row][current.col]) {
        meetingPoint = { row: current.row, col: current.col };
        break;
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
        if (grid[nr][nc].isWall || visitedEnd[nr][nc]) continue;

        visitedEnd[nr][nc] = true;
        parentEnd[nr][nc] = { row: current.row, col: current.col };
        queueEnd.push({ row: nr, col: nc });

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
  }

  let path = [];
  if (meetingPoint) {
    const pathFromStart = reconstructPath(parentStart, meetingPoint);
    const pathFromEnd = reconstructPath(parentEnd, meetingPoint);
    pathFromEnd.reverse();
    pathFromEnd.shift();
    path = [...pathFromStart, ...pathFromEnd];
  }

  return { steps, path, nodesExplored: explored };
}

function reconstructPath(parent, target) {
  const path = [];
  let current = { row: target.row, col: target.col };
  while (current) {
    path.unshift(current);
    current = parent[current.row][current.col];
  }
  return path;
}
