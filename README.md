# MIABC - Multilingual Interactive ABC Learning Platform

A comprehensive educational application supporting English, Spanish, and Tamil languages for children's literacy development.

## 📁 Project Structure

```
MIABC/
├── backend/              # FastAPI Backend Server
│   ├── migrations/       # Database migrations
│   ├── main.py          # API entry point
│   ├── models.py        # Database models
│   ├── schemas.py       # Pydantic schemas
│   ├── database.py      # Database configuration
│   ├── auth.py          # Authentication
│   ├── firebase_config.py # Firebase integration
│   ├── originalWords.sql # Data source (company provided)
│   ├── miabc.db         # SQLite database
│   └── requirements.txt # Python dependencies
│
└── frontend/            # React Native Mobile App
    ├── screens/         # App screens
    │   ├── registration/  # Multi-step registration
    │   └── categories/    # Learning modules
    ├── database/        # Local database & API client
    ├── assets/          # Images, fonts, icons
    ├── App.js          # Main app component
    └── package.json    # Node dependencies
```

## ✨ Features

- ✅ Multilingual vocabulary (English, Spanish, Tamil)
- ✅ User registration and authentication (JWT)
- ✅ Family member profiles with photos
- ✅ Reading texts and exercises
- ✅ Audio pronunciation support
- ✅ Firebase image storage
- ✅ RESTful API backend
- ✅ Cross-platform mobile app (iOS & Android)

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

**API Documentation:** http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Press `i` for iOS simulator or `a` for Android emulator.

## 💾 Database Management

- **Source SQL**: `backend/originalWords.sql` (company provided)
- **Database File**: `backend/miabc.db`
- **Migrations**: `backend/migrations/`

### Ingest Data from SQL

```bash
python ingest_data.py
```

This imports all vocabulary data from `originalWords.sql` into `miabc.db`.

## 🛠 Technology Stack

**Backend:**
- FastAPI - Modern Python web framework
- SQLAlchemy - ORM for database operations
- SQLite - Embedded database
- Firebase Admin SDK - Cloud storage
- Python-Jose - JWT authentication
- Pydantic - Data validation

**Frontend:**
- React Native - Mobile app framework
- Expo - Development platform
- React Navigation - Routing
- AsyncStorage - Local storage
- Axios - HTTP client

## 📡 API Endpoints

See `backend/API_ENDPOINTS.md` for complete API documentation.

**Key Endpoints:**
- `POST /register` - Create new user
- `POST /login` - Authenticate user
- `GET /words` - Get vocabulary words
- `GET /users/{id}` - Get user profile
- `POST /family-members` - Add family member

## 🗃 Database Schema

### Tables
- **users** - User accounts and profiles
- **originalWords** - Multilingual vocabulary (English, Spanish, Tamil)
- **familyMembers** - Family member information
- **readingTexts** - Reading materials and exercises

### Tamil Support
Added columns in `originalWords` table:
- `tamilWord` - Tamil script
- `tamilPronunciation` - Romanized pronunciation

## 🔐 Environment Variables

Create `backend/.env`:

```env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
DATABASE_URL=sqlite:///./miabc.db
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json
FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
```

## 📦 Dependencies

**Backend:**
```bash
pip install fastapi uvicorn sqlalchemy python-jose passlib python-multipart firebase-admin
```

**Frontend:**
```bash
npm install @react-navigation/native @react-navigation/native-stack expo-image-picker
```

## 🔧 Development

### Start Backend
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

### Start Frontend
```bash
cd frontend
npx expo start
```

### Run Data Ingestion
```bash
python ingest_data.py
```

## 📝 Project Documentation

- `backend/API_ENDPOINTS.md` - Complete API reference
- `backend/FIREBASE_SETUP.md` - Firebase configuration guide
- `backend/TAMIL_INTEGRATION.md` - Tamil language support details
- `frontend/API_INTEGRATION.md` - Frontend API integration guide
- `DATABASE.md` - Database schema and usage

## 🏢 Company Files

These files are provided by the company and should not be modified:
- `backend/originalWords.sql` - Official vocabulary data
- `backend/miabc.db` - Production database

## 📄 License

Proprietary - Company Internal Use Only

---

**Developed for multilingual literacy education**
