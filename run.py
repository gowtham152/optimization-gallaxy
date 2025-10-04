#!/usr/bin/env python3
"""
Optimization Galaxy - Simple launcher
"""

print("🚀 Launching Optimization Galaxy...")
print("📁 Current directory:", __file__)

# Simply import and run the app
try:
    from app import app
    print("✅ Successfully imported app!")
    print("🌐 Starting server at http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("\n💡 Troubleshooting:")
    print("1. Check that app.py exists in the same directory")
    print("2. Make sure app.py defines 'app = Flask(__name__)'")
    print("3. Try running: python app.py directly")
    input("Press Enter to exit...")