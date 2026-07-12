import { astar } from './astar';
import { dijkstra } from './dijkstra';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { greedyBestFirst } from './greedyBestFirst';
import { bidirectionalBfs } from './bidirectionalBfs';
import { ALGORITHMS } from '../utils/constants';

export const algorithmMap = {
  [ALGORITHMS.ASTAR]: astar,
  [ALGORITHMS.DIJKSTRA]: dijkstra,
  [ALGORITHMS.BFS]: bfs,
  [ALGORITHMS.DFS]: dfs,
  [ALGORITHMS.GREEDY]: greedyBestFirst,
  [ALGORITHMS.BIDIRECTIONAL]: bidirectionalBfs,
};

export { astar, dijkstra, bfs, dfs, greedyBestFirst, bidirectionalBfs };
