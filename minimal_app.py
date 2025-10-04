from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return """
    <html>
        <head>
            <title>Optimization Galaxy</title>
            <style>
                body { 
                    background: linear-gradient(45deg, #0a0a2a, #1a1a3a);
                    color: white;
                    font-family: Arial;
                    text-align: center;
                    padding: 100px;
                }
                h1 { color: #00ffff; text-shadow: 0 0 20px #00ffff; }
            </style>
        </head>
        <body>
            <h1>🌌 Optimization Galaxy</h1>
            <p>Flask is working! Basic setup is OK.</p>
            <p>Next step: Fix the main application.</p>
        </body>
    </html>
    """

if __name__ == '__main__':
    print("🚀 Starting minimal test server...")
    print("📍 Access at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)