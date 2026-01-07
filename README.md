# MiABC - Complete Full-Stack Application

Educational app for literacy learning in Spanish, English, and Tamil languages.

## 🎯 Project Structure

```
MIABC/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── main.py            # App entry point
│   │   ├── config.py          # Configuration settings
│   │   ├── database.py        # Database configuration
│   │   ├── dependencies.py    # Dependency injection
│   │   ├── core/              # Core utilities (Firebase)
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   └── routers/           # API route handlers
│   │       ├── auth.py        # Authentication routes
│   │       ├── users.py       # User management
│   │       ├── family.py      # Family members
│   │       ├── words.py       # Word database
│   │       ├── reading.py     # Reading texts
│   │       ├── uploads.py     # File uploads
│   │       ├── progress.py    # Learning progress
│   │       └── analytics.py   # Usage analytics
│   ├── data/                  # Data files
│   ├── scripts/               # Utility scripts
│   ├── run.py                 # Server startup
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
└── frontend/                   # React Native (Expo) Frontend
    ├── app/
    │   ├── _layout.tsx        # Root layout
    │   ├── index.tsx          # Entry point
    │   ├── auth.tsx           # Sign in/up screen
    │   ├── register.tsx       # Registration flow
    │   └── dashboard.tsx      # Main dashboard
    ├── components/            # Reusable components
    │   ├── ui/                # UI primitives
    │   ├── AuthBackground.tsx # Auth screen background
    │   └── ...                # Other components
    ├── services/
    │   └── api.ts             # API service layer
    ├── hooks/                 # Custom React hooks
    ├── constants/             # App constants
    ├── assets/                # Static assets
    ├── package.json           # Node dependencies
    └── tsconfig.json          # TypeScript config
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend and set up environment:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

2. **Configure environment variables:**
Create a `.env` file in the backend folder with:
```env
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
DATABASE_URL=sqlite:///./miabc.db
```

3. **Start the server:**
```bash
python run.py
```

The API will run on `http://localhost:8000`

4. **View API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Frontend Setup

1. **Navigate to frontend and install dependencies:**
```bash
cd frontend
npm install
```

2. **Update API configuration** in `frontend/services/api.ts`:
   
   For Android Emulator:
   ```typescript
   const API_BASE_URL = 'http://10.0.2.2:8000/api';
   ```

   For Physical Device (find your IP with `ipconfig`):
   ```typescript
   const API_BASE_URL = 'http://YOUR_IP:8000/api';
   ```

3. **Start the app:**
```bash
npm start
# or
npx expo start
```

## 📱 Features

### Backend (FastAPI)
- ✅ JWT Token Authentication
- ✅ User Registration & Login
- ✅ Trilingual Word Database (English/Spanish/Tamil)
- ✅ Family Member Management
- ✅ Reading Texts Management
- ✅ Learning Progress Tracking
- ✅ Analytics Dashboard
- ✅ Firebase Integration (File Uploads)
- ✅ RESTful API with automatic documentation
- ✅ SQLAlchemy ORM with Pydantic validation
- ✅ Password hashing with bcrypt

### Frontend (React Native + Expo)
- ✅ TypeScript Support
- ✅ Expo Router Navigation
- ✅ Sign In / Sign Up Flow
- ✅ Multi-step Registration Process
- ✅ Dashboard with Learning Categories
- ✅ Secure Token Storage (Expo SecureStore)
- ✅ Image Picker Integration
- ✅ Audio Playback Support
- ✅ Animations (React Native Reanimated)
- ✅ Haptic Feedback

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

### Learner Progress
- Quiz attempts
- Pronunciation attempts
- Learning sessions

## 🔒 API Authentication

All protected endpoints require a Bearer token:

```typescript
Authorization: Bearer <JWT_TOKEN>
```

The token is automatically managed by the API service layer.

## 📡 API Endpoints

### Authentication
```
POST /api/auth/login     - Login user
POST /api/auth/register  - Register new user
```

### Users
```
GET  /api/users/me       - Get current user
PUT  /api/users/me       - Update current user
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
GET    /api/family          - Get all members
POST   /api/family          - Create member
DELETE /api/family/{id}     - Delete member
```

### Reading Texts
```
GET    /api/reading         - Get all texts
POST   /api/reading         - Create text
GET    /api/reading/{id}    - Get text by ID
DELETE /api/reading/{id}    - Delete text
```

### Progress
```
GET    /api/progress        - Get learning progress
POST   /api/progress        - Record progress
```

### Analytics
```
GET    /api/analytics       - Get usage analytics
```

### Uploads
```
POST   /api/uploads/image   - Upload image
POST   /api/uploads/audio   - Upload audio
```

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | Modern Python web framework |
| **SQLAlchemy** | ORM for database operations |
| **Pydantic** | Data validation & serialization |
| **Python-JOSE** | JWT token handling |
| **Passlib + bcrypt** | Password hashing |
| **Firebase Admin** | Cloud file storage |
| **Pillow** | Image processing |
| **Uvicorn** | ASGI server |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo SDK 54** | Development platform |
| **Expo Router** | File-based navigation |
| **TypeScript** | Type safety |
| **React Native Reanimated** | Smooth animations |
| **Expo SecureStore** | Secure token storage |
| **Expo AV** | Audio/Video playback |
| **Expo Image Picker** | Image selection |

## 📝 Environment Variables

### Backend `.env`
```env
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
DATABASE_URL=sqlite:///./miabc.db
FIREBASE_CREDENTIALS=path/to/firebase-credentials.json
```

## 📱 Testing

### Test Registration Flow
1. Start backend server (`python run.py` in backend folder)
2. Start React Native app (`npm start` in frontend folder)
3. Click "Sign Up" on auth screen
4. Follow the registration process
5. Login with created credentials

### Test API Directly
Visit http://localhost:8000/docs and use the interactive Swagger UI.

## 🌐 Network Configuration

**Important:** Make sure your backend is accessible from your mobile device/emulator:

| Platform | Host Address |
|----------|--------------|
| **Android Emulator** | `10.0.2.2` |
| **iOS Simulator** | `localhost` |
| **Physical Device** | Your computer's IP (same WiFi) |

## 📂 Scripts

### Backend Scripts
Located in `backend/scripts/`:
- Data injection utilities
- Database migration scripts

### Frontend Scripts
Located in `frontend/scripts/`:
- Project reset utility

## 📄 License

Educational project for MiABC literacy learning platform.

## 🤝 Support

For issues or questions, refer to:
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
