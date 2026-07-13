# Pathfinding Algorithm Visualizer

🌐 **Live Demo:** https://pathfinding-ecru.vercel.app/

An interactive web application for visualizing **9 popular pathfinding algorithms** in real time. Build your own mazes, compare algorithms side by side, and watch each search strategy explore the grid **cell by cell**.

---

## ✨ Features

### 🧠 9 Pathfinding Algorithms

Visualize and compare:

- A*
- Dijkstra
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Greedy Best-First Search
- Bidirectional BFS
- Jump Point Search (JPS)
- Bidirectional A*
- Iterative Deepening DFS (IDDFS)

### 🏁 Compare Mode

Run multiple algorithms on the **same maze** and see which one reaches the goal first.

### 📊 Cost Visualization

Display **f**, **g**, and **h** values directly on grid cells to understand how weighted algorithms make decisions.

### 📜 Built-in Pseudocode

Every algorithm includes syntax-highlighted pseudocode for easier learning.

### 💡 Algorithm Explanations

Terminal-style information panel showing:

- How the algorithm works
- Time & space complexity
- Advantages
- Best use cases

### 🧱 Maze Generation

Generate mazes instantly using:

- Recursive Division
- Recursive Backtracker
- Random Walls

### ✏️ Custom Maze Editor

Click and drag to create your own walls and obstacles.

### 📈 Live Metrics

Track performance in real time:

- Nodes explored
- Path length
- Execution time

### ⚡ Adjustable Speed

Choose from six animation speeds:

- Crawl
- Slow
- Normal
- Fast
- Turbo
- Instant

### 🌙 Dark & Light Themes

Switch between light and dark mode.

### 📱 Mobile Friendly

Fully responsive with touch support.

### 🎓 Interactive Tutorial

A guided onboarding experience for first-time users.

---

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- Vercel

---

## 🧩 Algorithms

| Algorithm | Type | Shortest Path | Time Complexity | Cost Display |
|-----------|------|---------------|-----------------|--------------|
| A* | Weighted | ✅ Yes | O(E log V) | f = g + h |
| Dijkstra | Weighted | ✅ Yes | O(E + V log V) | g |
| BFS | Unweighted | ✅ Yes | O(V + E) | — |
| DFS | Unweighted | ❌ No | O(V + E) | — |
| Greedy Best-First | Weighted | ❌ No | O(E log V) | h |
| Bidirectional BFS | Unweighted | ✅ Yes | O(V + E) | — |
| Jump Point Search | Weighted | ✅ Yes | O(E log V) | f = g + h |
| Bidirectional A* | Weighted | ✅ Yes | O(E log V) | f = g + h |
| IDDFS | Unweighted | ✅ Yes* | O(V + E) | — |

> *IDDFS guarantees the shortest path only on unweighted graphs.

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/zakisserious/pathfinder.git
cd pathfinder

npm install
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## 📂 Project Structure

```text
src/
├── algorithms/
│   ├── astar.js
│   ├── dijkstra.js
│   ├── bfs.js
│   ├── dfs.js
│   ├── greedyBestFirst.js
│   ├── bidirectionalBfs.js
│   ├── jumpPointSearch.js
│   ├── bidirectionalAStar.js
│   └── iddfs.js
│
├── maze/
│   ├── recursiveDivision.js
│   ├── recursiveBacktracker.js
│   └── randomWalls.js
│
├── components/
│   ├── Grid/
│   ├── Controls/
│   ├── Compare/
│   ├── Legend/
│   ├── Metrics/
│   ├── Tutorial/
│   └── UI/
│
├── context/
│
└── utils/
```

---

## 🎮 How It Works

1. Draw walls by clicking or dragging on the grid.
2. Generate a maze using one of the built-in generators (optional).
3. Choose one of the **9 pathfinding algorithms**.
4. Toggle **Cost Display** to see `f`, `g`, and `h` values.
5. View the built-in pseudocode and algorithm explanation.
6. Click **Run Algorithm**.
7. Watch the algorithm explore the grid in real time.
8. Enable **Compare Mode** to race multiple algorithms on the same maze.

---

## 📄 License

Licensed under the **MIT License**.

---
