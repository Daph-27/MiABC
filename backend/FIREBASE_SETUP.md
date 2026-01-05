# 🔥 Firebase Integration Guide

## Setup Instructions

### 1. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `miabc-a2e3a`
3. Click the ⚙️ gear icon → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Save the downloaded JSON file as `firebase-credentials.json` in the `backend` folder

### 2. Configure Firebase

The `.env` file already has Firebase configuration:
```env
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json
FIREBASE_STORAGE_BUCKET=miabc-a2e3a.appspot.com
```

### 3. Install Firebase Dependencies

```bash
cd backend
pip install firebase-admin pillow
```

Or install from requirements:
```bash
pip install -r requirements.txt
```

## Features

### ✅ Tamil Word Support
- `tamilWord` - Tamil translation of the word
- `tamilPronunciation` - Romanized pronunciation
- Both columns are in the database and ready to use

### ✅ Firebase Storage Integration
- Upload images (profile photos, word images)
- Upload audio files (word pronunciations)
- Automatic URL generation
- Public access to uploaded files

### ✅ API Endpoints

#### Upload Image
```http
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image_file>
```

#### Upload Audio
```http
POST /api/upload/audio
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <audio_file>
```

#### Upload Profile Photo (Base64)
```http
POST /api/upload/profile-photo
Authorization: Bearer <token>
Content-Type: application/json

{
  "image_base64": "data:image/jpeg;base64,..."
}
```

## Database Structure

### originalWords Table
```sql
CREATE TABLE originalWords (
  id INTEGER PRIMARY KEY,
  englishName TEXT,
  spanishName TEXT,
  tamilWord TEXT,              -- ✅ Tamil translation
  tamilPronunciation TEXT,     -- ✅ Pronunciation guide
  englishSound TEXT,           -- Firebase URL
  spanishSound TEXT,           -- Firebase URL
  imagePath TEXT,              -- Firebase URL
  initials TEXT,
  type TEXT,
  tema TEXT,
  letra TEXT,
  recordFlag TEXT,
  key TEXT,
  dateCompleted DATETIME,
  createdAt DATETIME
)
```

## Populate Sample Data

Run the population script to add sample Tamil words:

```bash
cd backend
python populate_tamil_words.py
```

This will add 10+ words with:
- English names
- Spanish translations
- **Tamil words** (தமிழ்)
- **Tamil pronunciations**
- Firebase URLs for audio and images

## Example Word Entry

```json
{
  "englishName": "Fan",
  "spanishName": "Abanico",
  "tamilWord": "விசிறி",
  "tamilPronunciation": "visiri",
  "englishSound": "https://firebasestorage.googleapis.com/.../fan.mp3",
  "spanishSound": "https://firebasestorage.googleapis.com/.../abanico.mp3",
  "imagePath": "https://firebasestorage.googleapis.com/.../abanico.jpg",
  "initials": "Ff",
  "type": "object"
}
```

## Usage in Frontend

### Get Words with Tamil
```javascript
import { getAllWords } from './database/api';

const words = await getAllWords();
// Each word now has tamilWord and tamilPronunciation

words.forEach(word => {
  console.log(`${word.englishName} = ${word.tamilWord} (${word.tamilPronunciation})`);
});
```

### Upload Profile Photo
```javascript
import { setAuthToken } from './database/api';

const uploadPhoto = async (base64Image) => {
  const response = await fetch('http://10.0.2.2:8000/api/upload/profile-photo', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image_base64: base64Image })
  });
  return await response.json();
};
```

## Firebase Storage Structure

```
miabc-a2e3a.appspot.com/
├── audio/
│   ├── fan.mp3
│   ├── abanico.mp3
│   └── ...
├── images/
│   ├── bee.jpg
│   ├── coat.jpg
│   └── ...
├── profile/
│   ├── user1_photo.jpg
│   └── ...
└── reading/
    └── ...
```

## Troubleshooting

### Firebase Not Initialized
If you see `⚠️ Firebase credentials not found`:
1. Download credentials from Firebase Console
2. Save as `backend/firebase-credentials.json`
3. Restart the server

### Firebase Storage Disabled
The app will work without Firebase, but:
- File uploads will return the original data
- No cloud storage for images/audio
- Database still works normally

### Check Firebase Status
```http
GET http://localhost:8000/

Response:
{
  "message": "MiABC API is running",
  "version": "1.0.0",
  "firebase": true  // ✅ or false if not initialized
}
```

## Tamil Character Support

The database supports full Tamil Unicode characters:
- அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ
- க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன
- And all Tamil compound characters

All Tamil text is stored and retrieved correctly in UTF-8 encoding.
