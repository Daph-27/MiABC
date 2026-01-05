# MiABC - Complete Full-Stack Application

Educational app for literacy learning in Spanish, English, and Tamil languages.

## 🎯 Project Structure

```
MIABC/
├── backend/                 # FastAPI Backend
│   ├── main.py             # API endpoints
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   ├── database.py         # Database configuration
│   ├── auth.py             # JWT authentication
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables
│   └── start-server.bat    # Windows startup script
│
└── MiABC-App/              # React Native Frontend
    ├── App.js              # Main navigation
    ├── database/
    │   └── api.js          # API service layer
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── DashboardScreen.js
    │   ├── registration/   # 12-step registration
    │   └── categories/     # Learning modules
    └── package.json

```

## 🚀 Quick Start

### Backend Setup

1. **Start the backend server:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

Or double-click `start-server.bat` on Windows.

The API will run on `http://localhost:8000`

2. **View API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Frontend Setup

1. **Update API configuration** in `MiABC-App/database/api.js`:
   
   For Android Emulator:
   ```javascript
   const API_BASE_URL = 'http://10.0.2.2:8000/api';
   ```

   For Physical Device (find your IP with `ipconfig`):
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP:8000/api';
   ```

2. **Start the app:**
```bash
cd MiABC-App
npm start
```

## 📱 Features

### Backend (FastAPI)
- ✅ JWT Token Authentication
- ✅ User Registration & Login
- ✅ Trilingual Word Database (English/Spanish/Tamil)
- ✅ Family Member Management
- ✅ Reading Texts Management
- ✅ RESTful API with automatic documentation
- ✅ SQLAlchemy ORM
- ✅ Password hashing with bcrypt

### Frontend (React Native)
- ✅ 12-Step Registration Flow
- ✅ User Authentication
- ✅ Dashboard with 8 Learning Categories
- ✅ Alphabet Learning
- ✅ Sound Recognition
- ✅ Word Learning with Audio
- ✅ Family Member Profiles
- ✅ Color & Number Learning
- ✅ Reading Practice
- ✅ Settings & Configuration

## 🗄️ Database Schema

### Users
- User authentication and profile
- Guardian and learner information
- Access code validation

### Original Words
- English, Spanish, Tamil translations
- Audio file paths
- Image associations
- Letter categorization

### Family Members
- Name and relation
- Photo storage
- Audio recordings

### Reading Texts
- Practice texts
- Difficulty levels
- User-specific content

## 🔒 API Authentication

All protected endpoints require a Bearer token:

```javascript
Authorization: Bearer <JWT_TOKEN>
```

The token is automatically managed by the API service layer.

## 📡 API Endpoints

### Authentication
```
POST /api/register    - Register new user
POST /api/login       - Login user
GET  /api/me          - Get current user
```

### Words
```
GET    /api/words                  - Get all words
GET    /api/words/initial/{letter} - Get words by initial
GET    /api/words/{id}             - Get word by ID
POST   /api/words                  - Create word
PUT    /api/words/{id}             - Update word
DELETE /api/words/{id}             - Delete word
```

### Family Members
```
GET    /api/family-members     - Get all members
POST   /api/family-members     - Create member
DELETE /api/family-members/{id}- Delete member
```

### Reading Texts
```
GET    /api/reading-texts     - Get all texts
POST   /api/reading-texts     - Create text
GET    /api/reading-texts/{id}- Get text by ID
DELETE /api/reading-texts/{id}- Delete text
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **Python-JOSE** - JWT token handling
- **Passlib** - Password hashing
- **Uvicorn** - ASGI server

### Frontend
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Expo SQLite** - Local storage (legacy)
- **Expo AV** - Audio playback

## 📝 Environment Variables

Create `.env` file in backend folder:

```env
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
DATABASE_URL=sqlite:///./miabc.db
```

## 🔄 Migration from Local SQLite to API

The app has been migrated from local SQLite to a REST API backend:

**Before:** `import { getUser } from './database/db'`  
**After:** `import { loginUser } from './database/api'`

All database operations now go through HTTP requests to the FastAPI backend.

## 📱 Testing

### Test Registration
1. Start backend server
2. Start React Native app
3. Click "Register" on login screen
4. Follow 12-step registration process
5. Access code: Any unique code
6. Login with created credentials

### Test API Directly
Visit http://localhost:8000/docs and use the interactive Swagger UI.

## 🌐 Network Configuration

**Important:** Make sure your backend is accessible from your mobile device/emulator:

- **Android Emulator:** Use `10.0.2.2` instead of `localhost`
- **iOS Simulator:** Use `localhost`  
- **Physical Device:** Use your computer's IP address (same WiFi network)

## 📄 License

Educational project for MiABC literacy learning platform.

## 🤝 Support

For issues or questions, refer to:
- Backend README: `backend/README.md`
- Frontend Guide: `MiABC-App/API_INTEGRATION.md`
