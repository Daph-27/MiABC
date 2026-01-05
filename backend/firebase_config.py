import firebase_admin
from firebase_admin import credentials, storage
import os
from dotenv import load_dotenv
import base64
from io import BytesIO
from PIL import Image

load_dotenv()

# Initialize Firebase Admin SDK
def init_firebase():
    """Initialize Firebase Admin SDK with credentials"""
    try:
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH", "firebase-credentials.json")
        
        # Check if Firebase is already initialized
        if not firebase_admin._apps:
            if os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred, {
                    'storageBucket': os.getenv("FIREBASE_STORAGE_BUCKET", "miabc-a2e3a.appspot.com")
                })
                print("✅ Firebase initialized successfully")
            else:
                print(f"⚠️ Firebase credentials not found at {cred_path}")
                print("Firebase storage features will be disabled")
                return None
        
        return storage.bucket()
    except Exception as e:
        print(f"⚠️ Firebase initialization error: {e}")
        print("Continuing without Firebase storage")
        return None

# Get Firebase bucket
def get_bucket():
    """Get Firebase Storage bucket"""
    try:
        return storage.bucket()
    except:
        return None

def upload_image_to_firebase(image_data: str, path: str) -> str:
    """
    Upload base64 image to Firebase Storage
    
    Args:
        image_data: Base64 encoded image string
        path: Path in Firebase Storage (e.g., 'profile/user123.jpg')
    
    Returns:
        Public URL of uploaded image
    """
    try:
        bucket = get_bucket()
        if not bucket:
            return image_data  # Return original if Firebase not available
        
        # Decode base64 image
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        
        # Create blob and upload
        blob = bucket.blob(path)
        blob.upload_from_string(image_bytes, content_type='image/jpeg')
        
        # Make public and get URL
        blob.make_public()
        return blob.public_url
    
    except Exception as e:
        print(f"Error uploading to Firebase: {e}")
        return image_data  # Return original on error

def upload_audio_to_firebase(audio_data: bytes, path: str, content_type: str = 'audio/mpeg') -> str:
    """
    Upload audio file to Firebase Storage
    
    Args:
        audio_data: Audio file bytes
        path: Path in Firebase Storage (e.g., 'audio/word123.mp3')
        content_type: MIME type of audio file
    
    Returns:
        Public URL of uploaded audio
    """
    try:
        bucket = get_bucket()
        if not bucket:
            return ""
        
        # Create blob and upload
        blob = bucket.blob(path)
        blob.upload_from_string(audio_data, content_type=content_type)
        
        # Make public and get URL
        blob.make_public()
        return blob.public_url
    
    except Exception as e:
        print(f"Error uploading audio to Firebase: {e}")
        return ""

def delete_from_firebase(path: str) -> bool:
    """
    Delete file from Firebase Storage
    
    Args:
        path: Path in Firebase Storage
    
    Returns:
        True if successful, False otherwise
    """
    try:
        bucket = get_bucket()
        if not bucket:
            return False
        
        blob = bucket.blob(path)
        blob.delete()
        return True
    
    except Exception as e:
        print(f"Error deleting from Firebase: {e}")
        return False

def get_firebase_url(path: str) -> str:
    """
    Get public URL for a Firebase Storage path
    
    Args:
        path: Path in Firebase Storage
    
    Returns:
        Public URL
    """
    try:
        bucket = get_bucket()
        if not bucket:
            return ""
        
        blob = bucket.blob(path)
        blob.make_public()
        return blob.public_url
    
    except Exception as e:
        print(f"Error getting Firebase URL: {e}")
        return ""
