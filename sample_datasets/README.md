# Sample Datasets for Optimization Galaxy

This directory contains sample datasets that you can upload to test the different optimization algorithms in the Optimization Galaxy application.

## 📁 Available Datasets

### 🗺️ **TSP (Traveling Salesman Problem)**
- **`tsp_cities.tsp`** - Small dataset with 10 cities for quick testing
- **`large_tsp.tsp`** - Larger dataset with 20 US cities for performance testing

**Format:** Standard TSP format with city coordinates
**Use Case:** Find the shortest route visiting all cities exactly once

### 🎒 **Knapsack Problem**
- **`knapsack_items.csv`** - Basic dataset with 15 items (electronics theme)
- **`complex_knapsack.csv`** - Complex dataset with 25 items and categories

**Format:** CSV with columns: item_id, weight, value, name, [category]
**Use Case:** Select items to maximize value while staying within weight limit

### 🔗 **Bipartite Matching**
- **`bipartite_graph.json`** - Job assignment problem (5 people, 7 jobs)
- **`network_matching.json`** - Server-task allocation problem (6 servers, 8 tasks)

**Format:** JSON with left_nodes, right_nodes, and weighted edges
**Use Case:** Find optimal matching between two sets of nodes

## 🚀 How to Use

1. **Start the application:**
   ```
   cd Project_1
   python app.py
   ```

2. **Open your browser:**
   - Navigate to `http://localhost:5000`

3. **Upload datasets:**
   - Click the "📁 UPLOAD DATASET" button
   - Drag and drop or browse for files
   - Select appropriate datasets for the problem type you want to solve

4. **Run optimizations:**
   - Click on a planet (TSP, KNAPSACK, or MATCHING)
   - Select algorithm strategies
   - Click "Run" to see the optimization in action

## 📊 Dataset Details

### TSP Files (.tsp)
```
NAME: dataset_name
TYPE: TSP
DIMENSION: number_of_cities
EDGE_WEIGHT_TYPE: EUC_2D
NODE_COORD_SECTION
1 x1 y1
2 x2 y2
...
EOF
```

### Knapsack Files (.csv)
```csv
item_id,weight,value,name
1,10,60,Item1
2,20,100,Item2
...
```

### Matching Files (.json)
```json
{
  "graph_type": "bipartite",
  "left_nodes": [...],
  "right_nodes": [...],
  "edges": [{"from": "node1", "to": "node2", "weight": 0.8}]
}
```

## 🎯 Testing Scenarios

- **Quick Test:** Use `tsp_cities.tsp` and `knapsack_items.csv` for fast results
- **Performance Test:** Use `large_tsp.tsp` and `complex_knapsack.csv` for algorithm comparison
- **Real-world Scenarios:** Use the matching datasets for practical optimization problems

## 💡 Tips

- Start with smaller datasets to understand the algorithms
- Try different algorithm combinations to compare performance
- Use the 3D visualization mode for better insights
- Check the metrics panel to monitor optimization progress

Happy optimizing! 🌌✨
