# 📂 Upload Guide - Optimization Galaxy

## 🚀 Quick Start

Your **Optimization Galaxy** application is now running with a beautiful cool-themed UI! Here are the files you can upload to test different optimization problems.

### 📍 **Server Status**
- ✅ **Running at:** http://localhost:5000
- ✅ **Health Check:** All systems operational
- ✅ **API Status:** Working correctly

---

## 📁 **Files Ready for Upload**

I've created sample datasets in the `sample_datasets/` folder:

### 🗺️ **TSP (Traveling Salesman Problem)**
```
📄 tsp_cities.tsp        - 10 cities (quick test)
📄 large_tsp.tsp         - 20 US cities (performance test)
```

### 🎒 **Knapsack Problem**
```
📄 knapsack_items.csv    - 15 electronics items
📄 complex_knapsack.csv  - 25 office items with categories
```

### 🔗 **Bipartite Matching**
```
📄 bipartite_graph.json    - Job assignment (5 people → 7 jobs)
📄 network_matching.json   - Server allocation (6 servers → 8 tasks)
```

---

## 🎯 **How to Test**

### **Step 1: Access the Application**
1. Open your browser
2. Go to: **http://localhost:5000**
3. You'll see the cool blue-themed galaxy interface!

### **Step 2: Upload a Dataset**
1. Click the **"📁 UPLOAD DATASET"** button (floating button on bottom-right)
2. **Drag & drop** or **browse** for one of the sample files
3. Supported formats: `.tsp`, `.csv`, `.json`

### **Step 3: Run Optimization**
1. Click on a **planet** (TSP, KNAPSACK, or MATCHING)
2. Select one or more **algorithm strategies**
3. Click **"RUN"** to start optimization
4. Watch the **real-time visualization**!

### **Step 4: View Results**
- Monitor progress in the **metrics panel**
- Toggle between **2D/3D visualization**
- Check **execution time** and **performance**
- View **optimization history**

---

## 🎨 **New Cool Features**

### **Visual Improvements**
- ✨ **Cool color scheme** (blues, cyans, purples)
- 🔮 **Glassmorphism effects** with backdrop blur
- 🌟 **Enhanced animations** and particle systems
- 📱 **Responsive design** for all screen sizes

### **Interactive Elements**
- 🎛️ **Strategy mixer slider** for algorithm hybridization
- 📊 **Real-time performance charts**
- 🔄 **Smooth planet orbits** and animations
- 💫 **Particle effects** on interactions

### **Functionality**
- 🚀 **Multiple algorithm support**
- 📈 **Live metrics tracking**
- 🎯 **Problem-specific visualizations**
- 💾 **Run history tracking**

---

## 🧪 **Test Scenarios**

### **Quick Test (2-3 minutes)**
1. Upload `tsp_cities.tsp`
2. Select "Greedy" algorithm
3. Watch the 10-city tour optimization

### **Performance Comparison (5 minutes)**
1. Upload `complex_knapsack.csv`
2. Select multiple algorithms (Greedy + Dynamic Programming)
3. Compare execution times and results

### **Advanced Visualization (3 minutes)**
1. Upload `network_matching.json`
2. Switch to 3D view
3. Explore the server-task allocation visualization

---

## 🛠️ **Troubleshooting**

### **If upload doesn't work:**
- Check file format (must be `.tsp`, `.csv`, or `.json`)
- Try refreshing the page
- Use smaller files first

### **If visualization is slow:**
- Start with smaller datasets
- Close other browser tabs
- Try 2D view instead of 3D

### **If algorithms don't run:**
- Make sure at least one algorithm is selected (highlighted in cyan)
- Check browser console for errors (F12)

---

## 📊 **File Formats**

### **TSP Format (.tsp)**
```
NAME: dataset_name
TYPE: TSP
DIMENSION: 10
EDGE_WEIGHT_TYPE: EUC_2D
NODE_COORD_SECTION
1 x1 y1
2 x2 y2
...
EOF
```

### **Knapsack Format (.csv)**
```csv
item_id,weight,value,name
1,10,60,Item1
2,20,100,Item2
```

### **Matching Format (.json)**
```json
{
  "graph_type": "bipartite",
  "left_nodes": [...],
  "right_nodes": [...],
  "edges": [...]
}
```

---

## 🎉 **Ready to Explore!**

Your **Optimization Galaxy** is now fully operational with:
- ✅ Cool blue theme applied
- ✅ All UI issues fixed
- ✅ Sample datasets created
- ✅ API working correctly
- ✅ Visualizations enhanced

**Enjoy exploring the galaxy of optimization algorithms!** 🌌✨

---

*For technical details, see `sample_datasets/README.md`*
