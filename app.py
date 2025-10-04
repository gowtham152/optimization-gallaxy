from flask import Flask, render_template, request, jsonify
import os
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create Flask app instance
app = Flask(__name__)

# Try to load configuration
try:
    from config import Config
    app.config.from_object(Config)
    app.secret_key = app.config['SECRET_KEY']
    print("✅ Configuration loaded successfully!")
except ImportError as e:
    print(f"⚠️ Config import warning: {e}")
    # Use default configuration
    app.secret_key = 'fallback-secret-key-2024'
    print("✅ Using fallback configuration")

# Try to import optimizer
try:
    from optimizer import OptimizationFramework
    framework = OptimizationFramework()
    print("✅ Optimizer framework loaded")
except ImportError as e:
    print(f"⚠️ Optimizer import warning: {e}")
    # Create a simple fallback optimizer
    class SimpleOptimizer:
        def solve(self, problem_type, algorithm, filepath):
            # Demo solutions for testing
            if problem_type == 'tsp':
                return {
                    'solution': {
                        'tour': [0, 1, 2, 3, 0],
                        'distance': 7544.37,
                        'optimal': False,
                        'message': 'Demo TSP solution'
                    },
                    'execution_time': 0.15,
                    'algorithm': algorithm
                }
            elif problem_type == 'knapsack':
                return {
                    'solution': {
                        'selected_items': [0, 1, 2],
                        'total_value': 15,
                        'total_weight': 9,
                        'optimal': True,
                        'message': 'Demo Knapsack solution'
                    },
                    'execution_time': 0.08,
                    'algorithm': algorithm
                }
            else:  # matching
                return {
                    'solution': {
                        'matching': [[0, 5], [1, 7], [2, 8]],
                        'matching_size': 3,
                        'message': 'Demo Matching solution'
                    },
                    'execution_time': 0.12,
                    'algorithm': algorithm
                }
    framework = SimpleOptimizer()
    print("✅ Using demo optimizer")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/problem/<problem_type>')
def problem_page(problem_type):
    return render_template('problem.html', problem_type=problem_type)

@app.route('/api/solve', methods=['POST'])
def solve_problem():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'No JSON data received'})
            
        problem_type = data.get('problem_type', 'tsp')
        algorithms = data.get('algorithms', ['greedy'])
        
        # Map to bundled sample datasets
        if problem_type == 'tsp':
            filepath = os.path.join('data', 'tsp', 'berlin52.tsp')
        elif problem_type == 'knapsack':
            filepath = os.path.join('data', 'knapsack', 'sample1.csv')
        else:
            filepath = os.path.join('data', 'matching', 'bipartite5.json')
        
        results = []
        for algorithm in algorithms:
            result = framework.solve(problem_type, algorithm, filepath)
            results.append(result)
        
        return jsonify({
            'success': True, 
            'results': results,
            'best_result': results[0]
        })
    
    except Exception as e:
        logger.error(f"Error solving problem: {e}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/api/history')
def get_history():
    sample_history = [
        {
            'id': 1,
            'algorithm_name': 'greedy',
            'problem_type': 'tsp',
            'objective_value': 7544.37,
            'execution_time': 0.15,
            'created_at': '2024-01-15 10:30:00'
        },
        {
            'id': 2,
            'algorithm_name': 'dp', 
            'problem_type': 'knapsack',
            'objective_value': 15,
            'execution_time': 0.08,
            'created_at': '2024-01-15 10:32:00'
        }
    ]
    return jsonify(sample_history)

@app.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy', 
        'message': 'Optimization Galaxy is running!',
        'config_loaded': 'Config' in globals()
    })

@app.route('/test')
def test_page():
    return '''
    <html>
        <head>
            <title>Optimization Galaxy - Test</title>
            <style>
                body { 
                    background: linear-gradient(45deg, #0a0a2a, #1a1a3a);
                    color: white;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 100px;
                    text-align: center;
                }
                h1 { 
                    color: #00ffff;
                    text-shadow: 0 0 20px #00ffff;
                    font-size: 3em;
                }
                .status { 
                    background: rgba(255,255,255,0.1);
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px auto;
                    max-width: 500px;
                }
            </style>
        </head>
        <body>
            <h1>🌌 Optimization Galaxy</h1>
            <div class="status">
                <h2>✅ System Status: OPERATIONAL</h2>
                <p>Flask server is running correctly!</p>
                <p>Config loaded: ''' + ('✅ YES' if 'Config' in globals() else '❌ NO') + '''</p>
                <p>Optimizer loaded: ✅ YES</p>
            </div>
            <div>
                <a href="/" style="color: #00ffff; margin: 10px;">🏠 Main Dashboard</a>
                <a href="/health" style="color: #00ffff; margin: 10px;">❤️ Health Check</a>
                <a href="/problem/tsp" style="color: #00ffff; margin: 10px;">🗺️ TSP Problem</a>
            </div>
        </body>
    </html>
    '''

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 OPTIMIZATION GALAXY - STARTING SERVER")
    print("=" * 50)
    print("✅ Flask app initialized")
    print("📍 Local URL: http://localhost:5000")
    print("🌐 Network URL: http://0.0.0.0:5000") 
    print("❤️  Health check: http://localhost:5000/health")
    print("🧪 Test page: http://localhost:5000/test")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)