// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles-container');
    }
    
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 3 + 2;
        const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        this.container.appendChild(particle);
        
        // Animate particle
        anime({
            targets: particle,
            translateX: Math.random() * 200 - 100,
            translateY: Math.random() * 200 - 100,
            opacity: [1, 0],
            scale: [1, 0],
            duration: duration * 1000,
            easing: 'easeOutExpo',
            complete: () => particle.remove()
        });
        
        this.particles.push(particle);
    }
}

// Galaxy Initialization
function initGalaxy() {
    // Animate central hub
    anime({
        targets: '.hub-core',
        scale: [0.8, 1.2],
        opacity: [0.7, 1],
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });
    
    // Animate planets with staggered delays
    document.querySelectorAll('.planet').forEach((planet, index) => {
        anime({
            targets: planet,
            scale: [0.8, 1.1],
            duration: 2000,
            delay: index * 500,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    });
}

// Drag and Drop File Upload
function setupDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const fileNameDisplay = document.getElementById('file-name-display');
    let selectedFile = null;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add('highlight');
    }

    function unhighlight() {
        dropZone.classList.remove('highlight');
    }

    dropZone.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFileSelect, false);
    uploadButton.addEventListener('click', handleUpload, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleUpload() {
        if (selectedFile) {
            simulateUpload(selectedFile);
        }
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            const fileName = file.name.toLowerCase();

            if (fileName.endsWith('.tsp') || fileName.endsWith('.csv') || fileName.endsWith('.json')) {
                selectedFile = file;
                fileNameDisplay.textContent = `Selected: ${file.name}`;
                uploadButton.style.display = 'block';
            } else {
                showNotification('Invalid file type. Please upload .tsp, .csv, or .json files.', 'error');
                selectedFile = null;
                fileNameDisplay.textContent = '';
                uploadButton.style.display = 'none';
            }
        }
    }
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        const fileName = file.name.toLowerCase();
        
        if (fileName.endsWith('.tsp') || fileName.endsWith('.csv') || fileName.endsWith('.json')) {
            // Simulate upload process
            simulateUpload(file);
        } else {
            showNotification('Invalid file type. Please upload .tsp, .csv, or .json files.', 'error');
        }
    }
}

function simulateUpload(file) {
    const progressBar = document.createElement('div');
    progressBar.className = 'upload-progress';
    document.getElementById('drop-zone').appendChild(progressBar);
    
    anime({
        targets: progressBar,
        width: ['0%', '100%'],
        duration: 2000,
        easing: 'easeOutQuad',
        complete: () => {
            showNotification(`File "${file.name}" uploaded successfully!`, 'success');
            progressBar.remove();
            // Optionally close modal on success
            setTimeout(closeUploadModal, 1000);
        }
    });
}

// Strategy Mixer
function setupStrategyMixer() {
    const slider = document.getElementById('hybrid-slider');
    const particles = new ParticleSystem();
    
    slider.addEventListener('input', function() {
        const value = this.value;
        
        // Create particles on slider interaction
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                particles.createParticle(
                    slider.getBoundingClientRect().left + (value / 100) * slider.offsetWidth,
                    slider.getBoundingClientRect().top
                );
            }, i * 100);
        }
        
        updateHybridStrategy(value);
    });
}

function updateHybridStrategy(value) {
    const greedyWeight = value / 100;
    const dpWeight = 1 - greedyWeight;
    
    // Update UI to show current mix
    document.querySelector('.slider-container label').textContent = 
        `Greedy ${Math.round(greedyWeight * 100)}% ←→ DP ${Math.round(dpWeight * 100)}%`;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: ['100%', '0%'],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo'
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: ['0%', '100%'],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInExpo',
            complete: () => notification.remove()
        });
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Quick Stats Loader
async function loadQuickStats() {
    try {
        const response = await fetch('/api/history');
        const history = await response.json();
        
        document.getElementById('total-runs').textContent = history.length;
        
        if (history.length > 0) {
            const bestScore = Math.min(...history.map(run => run.objective_value));
            document.getElementById('best-score').textContent = bestScore.toFixed(2);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Modal Controls
function showUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.style.display = 'block';
    
    anime({
        targets: modal.querySelector('.modal-content'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack'
    });
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    
    anime({
        targets: modal.querySelector('.modal-content'),
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInBack',
        complete: () => {
            modal.style.display = 'none';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGalaxy();
    setupDragAndDrop();
    setupStrategyMixer();
    loadQuickStats();
    
    // Create background particles
    const particles = new ParticleSystem();
    setInterval(() => {
        if (Math.random() < 0.3) {
            particles.createParticle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }
    }, 100);
});

// Utility function for API calls
async function apiCall(endpoint, data = null) {
    try {
        const options = {
            method: data ? 'POST' : 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(endpoint, options);
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        showNotification('Network error. Please try again.', 'error');
        return null;
    }
}

// 3D/Particles helper to align with index.html expectation
function createParticles() {
    // Reuse ParticleSystem to sprinkle some initial particles
    const particles = new ParticleSystem();
    for (let i = 0; i < 50; i++) {
        particles.createParticle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
    }
}

// Simple history viewer overlay
async function showHistory() {
    const history = await apiCall('/api/history');
    if (!history) return;

    const overlay = document.createElement('div');
    overlay.className = 'history-overlay';
    overlay.innerHTML = `
        <div class="history-modal">
            <button class="history-close" aria-label="Close">✖</button>
            <h3>Run History</h3>
            <div class="history-list">
                ${history.map(run => `
                    <div class="history-item">
                        <div><strong>Problem:</strong> ${run.problem_type}</div>
                        <div><strong>Algorithm:</strong> ${run.algorithm_name}</div>
                        <div><strong>Objective:</strong> ${run.objective_value}</div>
                        <div><strong>Time:</strong> ${run.execution_time}s</div>
                        <div class="ts">${run.created_at || ''}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.history-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}