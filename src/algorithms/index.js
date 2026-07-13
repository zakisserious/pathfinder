import { astar } from './astar';
import { dijkstra } from './dijkstra';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { greedyBestFirst } from './greedyBestFirst';
import { bidirectionalBfs } from './bidirectionalBfs';
import { jumpPointSearch } from './jumpPointSearch';
import { bidirectionalAStar } from './bidirectionalAStar';
import { iddfs } from './iddfs';
import { ALGORITHMS } from '../utils/constants';

export const algorithmMap = {
  [ALGORITHMS.ASTAR]: astar,
  [ALGORITHMS.DIJKSTRA]: dijkstra,
  [ALGORITHMS.BFS]: bfs,
  [ALGORITHMS.DFS]: dfs,
  [ALGORITHMS.GREEDY]: greedyBestFirst,
  [ALGORITHMS.BIDIRECTIONAL]: bidirectionalBfs,
  [ALGORITHMS.JPS]: jumpPointSearch,
  [ALGORITHMS.BIDIRECTIONAL_ASTAR]: bidirectionalAStar,
  [ALGORITHMS.IDDFS]: iddfs,
};

export { astar, dijkstra, bfs, dfs, greedyBestFirst, bidirectionalBfs, jumpPointSearch, bidirectionalAStar, iddfs };
