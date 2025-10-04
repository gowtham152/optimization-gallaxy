# Project_1: Combinatorial Optimization - Multi-Strategy Approach

## Overview
This project builds a unified framework to solve combinatorial optimization problems like TSP (Traveling Salesman Problem), 0/1 Knapsack, and Bipartite Graph Matching using multiple strategies: Greedy heuristics, Divide & Conquer, Dynamic Programming (with memoization), Backtracking, and Branch & Bound. It compares performance (time, space, optimality) on real-world datasets stored in MySQL.

**Key Features**:
- **Unified Framework**: Abstract `Optimizer` class in `optimizer.py` for easy extension.
- **Cool UI**: Web app with dark nebula theme, animated "Optimization Galaxy" dashboard (orbiting planets), drag-drop uploads, strategy mixer slider, and dynamic visualizations (Chart.js charts, Anime.js animations).
- **Backend**: Python/Flask + MySQL for data storage and API.
- **Comparisons**: Real-time charts/tables on results page, with LaTeX-formatted equations (e.g., TSP distance formula).
- **Dynamic Elements**: Step-by-step algo animations (e.g., TSP tour path drawing), particle effects, responsive design.

**Tech Stack**:
- Python 3.8+ (Flask, NumPy, NetworkX, Pandas).
- MySQL (for datasets and runs).
- Frontend: HTML/CSS/JS (Chart.js, Anime.js, MathJax for LaTeX).

## Setup (Windows)
1. **Prerequisites**:
   - Install Python 3.8+: https://www.python.org/downloads/.
   - Install MySQL: Use XAMPP (https://www.apachefriends.org/) for easy setup (includes phpMyAdmin).
   - Start MySQL via XAMPP Control Panel.

2. **Create Virtual Environment**: