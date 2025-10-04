// Visualization Manager
class VisualizationManager {
    constructor() {
        this.canvas = document.getElementById('problem-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isRunning = false;
        this.animationFrame = null;
        this.currentStep = 0;
    }
    
    initVisualization() {
        // Set canvas size based on container
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        
        this.drawInitialState();
    }
    
    drawInitialState() {
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw title
        this.ctx.fillStyle = '#22d3ee';
        this.ctx.font = '20px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#22d3ee';
        this.ctx.shadowBlur = 10;
        this.ctx.fillText('OPTIMIZATION VISUALIZATION', this.canvas.width / 2, 30);
        this.ctx.shadowBlur = 0;
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        const gridSize = 50;
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    // TSP-specific visualization
    visualizeTSP(cities, tour, currentCity = null) {
        this.drawInitialState();
        
        // Draw cities
        cities.forEach((city, index) => {
            const x = (city.x / 100) * this.canvas.width;
            const y = (city.y / 100) * this.canvas.height;
            
            // City point
            this.ctx.fillStyle = index === 0 ? '#0ea5e9' : '#06b6d4';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 8, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // City glow
            this.ctx.shadowColor = index === 0 ? '#0ea5e9' : '#06b6d4';
            this.ctx.shadowBlur = 15;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // City label
            this.ctx.fillStyle = 'white';
            this.ctx.font = '12px Exo 2';
            this.ctx.fillText(index, x, y - 15);
        });
        
        // Draw tour path
        if (tour && tour.length > 1) {
            this.ctx.strokeStyle = '#22d3ee';
            this.ctx.lineWidth = 3;
            this.ctx.shadowColor = '#22d3ee';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            
            tour.forEach((cityIndex, i) => {
                const city = cities[cityIndex];
                const x = (city.x / 100) * this.canvas.width;
                const y = (city.y / 100) * this.canvas.height;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });
            
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }
        
        // Highlight current city
        if (currentCity !== null) {
            const city = cities[currentCity];
            const x = (city.x / 100) * this.canvas.width;
            const y = (city.y / 100) * this.canvas.height;
            
            this.ctx.fillStyle = '#8b5cf6';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 12, 0, 2 * Math.PI);
            this.ctx.fill();
            
            this.ctx.shadowColor = '#8b5cf6';
            this.ctx.shadowBlur = 20;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
}

// Performance Charts
class PerformanceChart {
    constructor() {
        this.charts = new Map();
    }
    
    createTimeChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Execution Time (ms)',
                    data: data.values,
                    borderColor: '#22d3ee',
                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font: {
                                family: 'Exo 2'
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'white'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'white'
                        }
                    }
                }
            }
        });
        
        this.charts.set(canvasId, chart);
    }
}

// Global visualization manager instance
const vizManager = new VisualizationManager();
const performanceChart = new PerformanceChart();

// Export functions for HTML use
function initVisualization() {
    vizManager.initVisualization();
}

function runOptimization() {
    const selectedAlgorithms = Array.from(document.querySelectorAll('.strategy-card.selected'))
        .map(card => card.dataset.algorithm);
    
    if (selectedAlgorithms.length === 0) {
        showNotification('Please select at least one algorithm strategy.', 'warning');
        return;
    }
    
    vizManager.isRunning = true;
    document.getElementById('run-btn').disabled = true;
    
    // Simulate optimization process (replace with actual API call)
    simulateOptimization(selectedAlgorithms);
}

function simulateOptimization(algorithms) {
    let step = 0;
    const cities = generateRandomCities(15);
    let bestTour = null;
    let bestDistance = Infinity;
    
    function stepAnimation() {
        if (!vizManager.isRunning) return;
        
        step++;
        
        // Generate random tour for demonstration
        const currentTour = generateRandomTour(cities.length);
        const currentDistance = calculateTourDistance(currentTour, cities);
        
        if (currentDistance < bestDistance) {
            bestDistance = currentDistance;
            bestTour = [...currentTour];
        }
        
        // Update visualization
        vizManager.visualizeTSP(cities, bestTour, currentTour[step % currentTour.length]);
        
        // Update metrics
        updateMetrics(step, currentDistance, bestDistance);
        
        if (step < 100) {
            vizManager.animationFrame = requestAnimationFrame(stepAnimation);
        } else {
            finishOptimization();
        }
    }
    
    vizManager.animationFrame = requestAnimationFrame(stepAnimation);
}

function updateMetrics(iteration, currentScore, bestScore) {
    document.getElementById('iterations').textContent = iteration;
    document.getElementById('current-score').textContent = currentScore.toFixed(2);
    document.getElementById('execution-time').textContent = (iteration * 0.1).toFixed(1) + 's';
    
    // Update progress bars
    const progress = (1 - (currentScore / 1000)) * 100;
    document.getElementById('score-progress').style.width = Math.max(0, progress) + '%';
}

function finishOptimization() {
    vizManager.isRunning = false;
    document.getElementById('run-btn').disabled = false;
    showNotification('Optimization completed successfully!', 'success');
}

function pauseOptimization() {
    vizManager.isRunning = false;
    if (vizManager.animationFrame) {
        cancelAnimationFrame(vizManager.animationFrame);
    }
}

function resetVisualization() {
    pauseOptimization();
    vizManager.currentStep = 0;
    vizManager.initVisualization();
    
    // Reset metrics
    document.getElementById('iterations').textContent = '0';
    document.getElementById('current-score').textContent = '-';
    document.getElementById('execution-time').textContent = '0.0s';
    document.getElementById('score-progress').style.width = '0%';
}

// Utility functions for demo
function generateRandomCities(count) {
    return Array.from({length: count}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
    }));
}

function generateRandomTour(length) {
    const tour = Array.from({length}, (_, i) => i);
    for (let i = tour.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tour[i], tour[j]] = [tour[j], tour[i]];
    }
    return tour;
}

function calculateTourDistance(tour, cities) {
    let distance = 0;
    for (let i = 0; i < tour.length; i++) {
        const current = cities[tour[i]];
        const next = cities[tour[(i + 1) % tour.length]];
        distance += Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
    }
    return distance;
}