# Pathfinding Algorithm Visualizer

An interactive web app for visualizing 6 pathfinding algorithms in real-time. Draw mazes, pick an algorithm, and watch it solve the grid step by step.

## Live Demo

[**Try it live**](https://your-app.vercel.app) <!-- Update this link after deployment -->

## Features

- **6 Pathfinding Algorithms** — A\*, Dijkstra, BFS, DFS, Greedy Best-First, Bidirectional BFS
- **Algorithm "Thinking"** — Toggle f/g/h values on cells to see how each algorithm makes decisions
- **Algorithm Explanations** — Detailed panel showing time/space complexity, tradeoffs, and best use cases
- **Maze Generation** — 3 algorithms: Recursive Division, Recursive Backtracker, Random Walls
- **Custom Mazes** — Click/drag to draw your own walls
- **Dark & Light Mode** — Toggle between themes (default: dark)
- **Mobile-First** — Full touch support, responsive on all devices
- **Interactive Tutorial** — 5-step onboarding for first-time users
- **Live Metrics** — Nodes explored, path length, execution time
- **Speed Control** — Slow, Medium, Fast animation speeds

## Algorithms

| Algorithm | Type | Shortest Path? | Complexity |
|-----------|------|---------------|------------|
| **A\*** | Weighted | Yes | O(E log V) |
| **Dijkstra** | Weighted | Yes | O(E + V log V) |
| **BFS** | Unweighted | Yes | O(V + E) |
| **DFS** | Unweighted | No | O(V + E) |
| **Greedy Best-First** | Weighted | No | O(E log V) |
| **Bidirectional BFS** | Unweighted | Yes | O(V + E) |

## Tech Stack

- **React** — UI framework
- **Tailwind CSS** — Styling
- **Vite** — Build tool
- **Vercel** — Deployment

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/pathfinding-visualizer.git
cd pathfinding-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── algorithms/        # Pathfinding algorithm implementations
│   ├── astar.js
│   ├── dijkstra.js
│   ├── bfs.js
│   ├── dfs.js
│   ├── greedyBestFirst.js
│   └── bidirectionalBfs.js
├── maze/              # Maze generation algorithms
│   ├── recursiveDivision.js
│   ├── recursiveBacktracker.js
│   └── randomWalls.js
├── components/
│   ├── Grid/          # Grid and Cell rendering
│   ├── Controls/      # Toolbar, algorithm picker, speed slider
│   ├── Legend/         # Color key
│   ├── Metrics/       # Live statistics
│   ├── Tutorial/      # Onboarding overlay
│   └── UI/            # Reusable UI components
├── context/           # React context (theme, grid state)
└── utils/             # Constants, colors, helpers
```

## How It Works

1. **Draw walls** by clicking/dragging on the grid, or **generate a maze** with the preset algorithms
2. **Pick an algorithm** from the 6 available options
3. **Toggle "Show f/g/h"** to see the algorithm's decision-making process on each cell
4. **Hit "Run Algorithm"** and watch the animated visualization
5. **Compare algorithms** by running different ones on the same maze

## License

MIT
