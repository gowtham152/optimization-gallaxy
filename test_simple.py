print("🚀 Python is working!")
print("Testing basic functionality...")

try:
    import flask
    print("✅ Flask is installed")
except ImportError:
    print("❌ Flask is NOT installed")

try:
    import mysql.connector
    print("✅ mysql-connector is installed")
except ImportError:
    print("❌ mysql-connector is NOT installed")

print("Test completed!")