export const CELL_STATES = {
  EMPTY: 'empty',
  WALL: 'wall',
  START: 'start',
  END: 'end',
  VISITED: 'visited',
  PATH: 'path',
  FRONTIER: 'frontier',
};

export const ALGORITHMS = {
  ASTAR: 'astar',
  DIJKSTRA: 'dijkstra',
  BFS: 'bfs',
  DFS: 'dfs',
  GREEDY: 'greedy',
  BIDIRECTIONAL: 'bidirectional',
};

export const ALGORITHM_INFO = {
  [ALGORITHMS.ASTAR]: {
    name: 'A* Search',
    shortName: 'A*',
    description:
      'A* uses a heuristic function to guide its search toward the goal. It combines the actual cost from the start (g) with an estimated cost to the goal (h) to calculate f = g + h. This makes it both optimal and efficient.',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    weighted: true,
    guaranteesShortest: true,
    bestFor: 'General-purpose pathfinding when a heuristic is available. Used in games, robotics, and GPS navigation.',
    showsValues: true,
  },
  [ALGORITHMS.DIJKSTRA]: {
    name: "Dijkstra's Algorithm",
    shortName: 'Dijkstra',
    description:
      "Dijkstra's algorithm explores all directions equally, expanding outward from the start like a ripple in water. It always finds the shortest path by visiting nodes in order of their distance from the start.",
    timeComplexity: 'O(E + V log V)',
    spaceComplexity: 'O(V)',
    weighted: true,
    guaranteesShortest: true,
    bestFor: 'Finding shortest paths in weighted graphs. The foundation of most pathfinding algorithms.',
    showsValues: true,
  },
  [ALGORITHMS.BFS]: {
    name: 'Breadth-First Search',
    shortName: 'BFS',
    description:
      'BFS explores the grid layer by layer, visiting all neighbors at the current depth before moving deeper. It guarantees the shortest path in unweighted graphs by exploring in a perfect square pattern.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    weighted: false,
    guaranteesShortest: true,
    bestFor: 'Unweighted grids. Simple, reliable, and guaranteed to find the shortest path when all edges have equal weight.',
    showsValues: false,
  },
  [ALGORITHMS.DFS]: {
    name: 'Depth-First Search',
    shortName: 'DFS',
    description:
      'DFS dives as deep as possible along each branch before backtracking. It does NOT guarantee the shortest path — it may find a very long route while a shorter one exists. Included here to show why greedy depth exploration is often suboptimal.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    weighted: false,
    guaranteesShortest: false,
    bestFor: 'Maze generation and topological sorting. NOT recommended for shortest-path finding.',
    showsValues: false,
  },
  [ALGORITHMS.GREEDY]: {
    name: 'Greedy Best-First Search',
    shortName: 'Greedy',
    description:
      'Greedy Best-First uses only the heuristic (estimated distance to goal) to decide which node to explore next. It races toward the goal but can be tricked into taking suboptimal paths because it ignores the actual cost traveled.',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    weighted: true,
    guaranteesShortest: false,
    bestFor: 'When you need a "good enough" path quickly. Common in game AI where speed matters more than optimality.',
    showsValues: true,
  },
  [ALGORITHMS.BIDIRECTIONAL]: {
    name: 'Bidirectional BFS',
    shortName: 'Bidirectional',
    description:
      'Runs two simultaneous BFS searches — one from the start and one from the end — meeting in the middle. This dramatically reduces the search space because each search only needs to cover half the distance.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    weighted: false,
    guaranteesShortest: true,
    bestFor: 'Large grids where searching from both ends is more efficient. Used in social networks and navigation systems.',
    showsValues: false,
  },
};

export const MAZE_ALGORITHMS = {
  RECURSIVE_DIVISION: 'recursiveDivision',
  RECURSIVE_BACKTRACKER: 'recursiveBacktracker',
  RANDOM_WALLS: 'randomWalls',
};

export const MAZE_INFO = {
  [MAZE_ALGORITHMS.RECURSIVE_DIVISION]: {
    name: 'Recursive Division',
    description: 'Creates rooms with corridors by recursively dividing the grid with walls and passages.',
  },
  [MAZE_ALGORITHMS.RECURSIVE_BACKTRACKER]: {
    name: 'Recursive Backtracker',
    description: 'Carves passages using randomized DFS, creating perfect mazes with exactly one solution.',
  },
  [MAZE_ALGORITHMS.RANDOM_WALLS]: {
    name: 'Random Walls',
    description: 'Scatters walls randomly across the grid at configurable density.',
  },
};

export const SPEEDS = {
  SLOW: { label: 'Slow', delay: 80 },
  MEDIUM: { label: 'Medium', delay: 30 },
  FAST: { label: 'Fast', delay: 5 },
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const DIRECTIONS_4 = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const DIRECTIONS_8 = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

export const ALGORITHM_COLORS = {
  [ALGORITHMS.ASTAR]: {
    visited: 'bg-cyan-500',
    path: 'bg-cyan-300',
    label: 'text-cyan-400',
    dot: 'bg-cyan-400',
    hex: '#06B6D4',
    pathHex: '#67E8F9',
  },
  [ALGORITHMS.DIJKSTRA]: {
    visited: 'bg-violet-500',
    path: 'bg-violet-300',
    label: 'text-violet-400',
    dot: 'bg-violet-400',
    hex: '#8B5CF6',
    pathHex: '#C4B5FD',
  },
  [ALGORITHMS.BFS]: {
    visited: 'bg-emerald-500',
    path: 'bg-emerald-300',
    label: 'text-emerald-400',
    dot: 'bg-emerald-400',
    hex: '#10B981',
    pathHex: '#6EE7B7',
  },
  [ALGORITHMS.DFS]: {
    visited: 'bg-rose-500',
    path: 'bg-rose-300',
    label: 'text-rose-400',
    dot: 'bg-rose-400',
    hex: '#F43F5E',
    pathHex: '#FDA4AF',
  },
  [ALGORITHMS.GREEDY]: {
    visited: 'bg-amber-500',
    path: 'bg-amber-300',
    label: 'text-amber-400',
    dot: 'bg-amber-400',
    hex: '#F59E0B',
    pathHex: '#FCD34D',
  },
  [ALGORITHMS.BIDIRECTIONAL]: {
    visited: 'bg-blue-500',
    path: 'bg-blue-300',
    label: 'text-blue-400',
    dot: 'bg-blue-400',
    hex: '#3B82F6',
    pathHex: '#93C5FD',
  },
};
