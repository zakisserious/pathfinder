# 🧭 Pathfinding Algorithm Visualizer

> **An interactive visualizer for exploring how popular pathfinding algorithms work—step by step, cell by cell.**

### 🌐 Live Demo
### **https://pathfinding-ecru.vercel.app/**

---

## ✨ Overview

Pathfinding Algorithm Visualizer is an educational web application built to help users understand how different search algorithms explore a grid and find paths.

Create your own mazes, generate random ones, compare multiple algorithms side-by-side, and inspect every decision they make in real time.

---

## 🚀 Features

### 🔍 Pathfinding Algorithms

Visualize **9 different algorithms**:

- ⭐ A*
- 🟡 Dijkstra
- 🔵 Breadth-First Search (BFS)
- 🟣 Depth-First Search (DFS)
- 🟢 Greedy Best-First Search
- 🔄 Bidirectional BFS
- ⚡ Jump Point Search (JPS)
- 🚀 Bidirectional A*
- 🌲 Iterative Deepening DFS (IDDFS)

---

### 🏁 Compare Mode

Run multiple algorithms on the **same maze** and compare:

- Search speed
- Nodes explored
- Path length
- Overall efficiency

---

### 📊 Cost Visualization

Understand how weighted algorithms think by displaying:

- **g** → Distance from the start
- **h** → Heuristic estimate
- **f = g + h** → Total cost

---

### 📜 Built-in Learning Tools

Every algorithm includes:

- Syntax-highlighted pseudocode
- Algorithm explanation
- Time & space complexity
- Best use cases
- Terminal-style documentation panel

---

### 🧱 Maze Generation

Generate test cases instantly with:

- Recursive Division
- Recursive Backtracker
- Random Walls

Or create your own maze by clicking and dragging.

---

### ⚡ Additional Features

- 🌙 Dark & Light themes
- 📱 Fully responsive & mobile friendly
- 🎓 Interactive onboarding tutorial
- 📈 Live metrics
- 🎛️ 6 animation speeds
- 🖱️ Click & drag wall editing

---

# 📈 Algorithms

| Algorithm | Type | Shortest Path | Complexity | Cost |
|------------|------|---------------|------------|------|
| A* | Weighted | ✅ | O(E log V) | f = g + h |
| Dijkstra | Weighted | ✅ | O(E + V log V) | g |
| BFS | Unweighted | ✅ | O(V + E) | — |
| DFS | Unweighted | ❌ | O(V + E) | — |
| Greedy Best-First | Weighted | ❌ | O(E log V) | h |
| Bidirectional BFS | Unweighted | ✅ | O(V + E) | — |
| Jump Point Search | Weighted | ✅ | O(E log V) | f = g + h |
| Bidirectional A* | Weighted | ✅ | O(E log V) | f = g + h |
| IDDFS* | Unweighted | ✅ | O(V + E) | — |

> *IDDFS guarantees the shortest path only on unweighted graphs.*

---

# 🛠️ Tech Stack

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- ▲ Vercel

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/zakisserious/pathfinder.git
cd pathfinder
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:5173
```

---

# 📂 Project Structure

```text
src/
├── algorithms/
├── maze/
├── components/
│   ├── Grid/
│   ├── Controls/
│   ├── Compare/
│   ├── Legend/
│   ├── Metrics/
│   ├── Tutorial/
│   └── UI/
├── context/
└── utils/
```

---

# 🎮 How to Use

1. Draw walls or generate a maze.
2. Select a pathfinding algorithm.
3. (Optional) Enable **Cost Visualization**.
4. Run the algorithm.
5. Watch it explore the grid in real time.
6. Compare multiple algorithms using **Compare Mode**.

---

# 🎯 Purpose

This project was built to make pathfinding algorithms easier to understand through interactive visualization.

It's useful for:

- Computer Science students
- Interview preparation
- Learning graph algorithms
- Teaching data structures & algorithms
- Anyone curious about how pathfinding works

---

# 📄 License

This project is licensed under the **MIT License**.

---
