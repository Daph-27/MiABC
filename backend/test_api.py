"""
Quick test to verify API returns all words
"""
import requests

# Test API endpoint
url = "http://localhost:8000/api/words"

try:
    response = requests.get(url)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        words = response.json()
        print(f"✅ API is working!")
        print(f"📊 Total words returned: {len(words)}")
        print(f"\n🎵 First 5 words with audio:")
        for i, word in enumerate(words[:5], 1):
            print(f"  {i}. {word['englishName']} - EN: {word['englishSound'][:50]}...")
            print(f"     {word['spanishName']} - ES: {word['spanishSound'][:50]}...")
    else:
        print(f"❌ API error: {response.status_code}")
        print(f"Response: {response.text}")
except Exception as e:
    print(f"❌ Connection error: {e}")
    print("Make sure backend server is running: python main.py")
