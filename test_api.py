#!/usr/bin/env python3
"""
Simple test script to verify the API endpoints work correctly
"""
import requests
import json

def test_api():
    base_url = "http://localhost:5000"
    
    print("🧪 Testing Optimization Galaxy API...")
    print("=" * 50)
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health check: PASSED")
            print(f"   Response: {response.json()}")
        else:
            print("❌ Health check: FAILED")
    except Exception as e:
        print(f"❌ Health check error: {e}")
    
    print()
    
    # Test solve endpoint
    test_data = {
        "problem_type": "tsp",
        "algorithms": ["greedy"]
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/solve",
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                print("✅ API solve: PASSED")
                print(f"   Algorithm: {result['results'][0]['algorithm']}")
                print(f"   Execution time: {result['results'][0]['execution_time']}s")
            else:
                print("❌ API solve: FAILED")
                print(f"   Error: {result.get('error')}")
        else:
            print(f"❌ API solve: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ API solve error: {e}")
    
    print()
    
    # Test history endpoint
    try:
        response = requests.get(f"{base_url}/api/history")
        if response.status_code == 200:
            history = response.json()
            print("✅ History endpoint: PASSED")
            print(f"   History entries: {len(history)}")
        else:
            print("❌ History endpoint: FAILED")
    except Exception as e:
        print(f"❌ History endpoint error: {e}")
    
    print()
    print("🎉 API testing completed!")

if __name__ == "__main__":
    test_api()
