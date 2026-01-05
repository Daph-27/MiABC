# MiABC Tamil - AI-Ready Educational Platform Prototype

## Overview
This prototype demonstrates a bilingual/trilingual educational mobile application with integrated learner tracking and analytics infrastructure, designed to support future AI-driven adaptive learning.

**Languages Supported:**
- English
- Español (Spanish)
- தமிழ் (Tamil)

## Project Structure

```
MIABC/
├── backend/           # FastAPI Backend
│   ├── main.py       # API endpoints
│   ├── models.py     # Database models
│   ├── schemas.py    # Pydantic schemas
│   ├── auth.py       # Authentication
│   ├── database.py   # Database configuration
│   └── view_database.py  # Database viewer utility
├── frontend/         # React Native App
│   ├── screens/      # All app screens
│   ├── database/     # API integration
│   └── assets/       # Images and icons
└── MiABC-App/       # Legacy folder (can be removed)
```

## Features Implemented

### 1. **User Authentication & Management**
- User registration with guardian information
- Learner profiles with grade levels
- Secure login with JWT tokens
- Parental controls

### 2. **Learning Modules**
- **Alphabet (Alfabeto/அகரவரிசை)**: Interactive letter learning with audio
- **Sounds (Sonidos/ஒலிகள்)**: Pronunciation practice with multilingual audio
- **Words (Palabras)**: Vocabulary building with images and sounds
- **Colors (Colores)**: Color recognition
- **Numbers (Números)**: Number learning
- **Family (Familia)**: Family member management
- **Shapes (Figuras)**: Geometric shapes
- **Reading (Ya Sé Leer)**: Reading comprehension

### 3. **Learner Progress Tracking** (NEW)
- Module completion tracking
- Performance scoring (0-100 scale)
- Time spent analytics
- Attempt counting
- Language-specific progress

### 4. **Quiz & Assessment System** (NEW)
- Quiz attempt logging
- Correctness tracking
- Response time measurement
- Question-level analytics

### 5. **Pronunciation Tracking** (NEW)
- Word pronunciation attempts
- Accuracy scoring
- Audio recording capability
- Multi-language support

### 6. **Learning Sessions** (NEW)
- Session start/end tracking
- Module access history
- Total time spent
- Average performance per session

### 7. **Analytics Dashboard** (NEW)
Comprehensive learner analytics including:
- Total sessions completed
- Total time spent learning
- Average scores across modules
- Module-wise progress
- Strong areas identification
- Weak areas for focused revision
- Recent activity timeline

### 8. **Database Management**
- SQLite for local data (241 words with audio)
- Firebase for cloud storage
- Automated database viewer tool
- Progress and analytics storage

## Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **JWT** - Secure authentication
- **Firebase** - Cloud storage for media files
- **SQLite** - Lightweight database

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development tooling
- **React Navigation** - Screen navigation
- **Expo AV** - Audio playback
- **AsyncStorage** - Local storage

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables (.env):
```
DATABASE_URL=sqlite:///./miabc.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4. Start the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

5. View database contents:
```bash
python view_database.py
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start Expo development server:
```bash
npx expo start
```

4. Run on platforms:
- Press `a` for Android emulator
- Press `i` for iOS simulator  
- Press `w` for web browser
- Scan QR code for physical device

## API Documentation

### Authentication Endpoints
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/me` - Get current user info

### Progress Tracking Endpoints
- `POST /api/progress` - Track module progress
- `GET /api/progress?module={name}` - Get progress data
- `POST /api/quiz/attempt` - Record quiz attempt
- `GET /api/quiz/attempts?quiz_type={type}` - Get quiz history
- `POST /api/pronunciation/attempt` - Record pronunciation
- `POST /api/session/start` - Start learning session
- `PUT /api/session/{id}` - End learning session

### Analytics Endpoints
- `GET /api/analytics/overview` - Comprehensive learner analytics
- `GET /api/analytics/module/{name}` - Module-specific statistics

### Content Endpoints
- `GET /api/words` - Get all words
- `GET /api/words/initial/{letter}` - Words by letter
- `GET /api/words/type/{type}` - Words by category
- `GET /api/family-members` - Get family members
- `POST /api/family-members` - Add family member

## Data Models

### LearnerProgress
Tracks learner activity in each module:
- Module name and type
- Performance score (0-100)
- Attempts count
- Completion status
- Time spent
- Language preference

### QuizAttempt
Records quiz and assessment attempts:
- Quiz type
- User answer vs correct answer
- Correctness flag
- Response time
- Language

### PronunciationAttempt
Tracks pronunciation practice:
- Target word
- User pronunciation recording
- Accuracy score (0-100)
- Language

### LearningSession
Overall session tracking:
- Session duration
- Modules accessed
- Items completed
- Average score

## AI Integration Readiness

This prototype is designed with AI integration in mind:

### 1. **Data Collection Infrastructure**
- ✅ Progress tracking for all modules
- ✅ Performance scoring system
- ✅ Time-based analytics
- ✅ Quiz attempt logging
- ✅ Pronunciation tracking

### 2. **Analytics Foundation**
- ✅ Module-wise performance metrics
- ✅ Strong/weak area identification
- ✅ Learning pattern detection
- ✅ Session-based insights

### 3. **Future AI Features**
Ready for integration:
- **Adaptive Difficulty**: Using progress scores to adjust content difficulty
- **Personalized Learning Paths**: Based on weak areas and performance
- **Content Recommendations**: Using LangChain for context management
- **Semantic Search**: FAISS integration for similar word/concept matching
- **Predictive Analytics**: ML models for learning outcome prediction

### 4. **Data Available for AI**
- 41 words with English, Spanish, and Tamil content
- 2 registered users with learner profiles
- Module completion patterns
- Quiz performance data
- Pronunciation accuracy metrics
- Time spent per module
- Session activity logs

## Testing the Prototype

### 1. Test User Login
```
Username: john@gmail.com
Password: (your test password)
```

Or register a new user through the app.

### 2. Test Learning Modules
- Open **Sounds** to hear word pronunciations
- Navigate through **Alphabet** for letter learning
- Try **Words** module for vocabulary
- Check **Settings** for user profile display

### 3. View Analytics (via API)
```bash
# Get learner analytics
curl -H "Authorization: Bearer {token}" http://localhost:8000/api/analytics/overview

# Get module stats
curl -H "Authorization: Bearer {token}" http://localhost:8000/api/analytics/module/Alfabeto
```

### 4. Database Inspection
```bash
cd backend
python view_database.py
```

## Deployment Preparation

### Backend Deployment (Heroku/Railway)
1. Add `Procfile`:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

2. Update `requirements.txt`
3. Configure environment variables
4. Deploy via Git

### Frontend Deployment (Expo)
1. Build for Android:
```bash
expo build:android
```

2. Build for iOS:
```bash
expo build:ios
```

3. Or use EAS Build:
```bash
eas build --platform all
```

## Performance Metrics

### Current Database
- **Users**: 2 registered learners
- **Words**: 41 with multilingual audio
- **Family Members**: 1 record
- **Unique Letters**: 9 initials covered
- **Word Types**: 6 categories

### API Performance
- Average response time: <100ms
- Audio streaming: Firebase CDN
- Platform support: Android, iOS, Web

## Future Enhancements (AI Phase)

### Phase 1: Basic AI
- Difficulty level adaptation based on scores
- Weak area focus recommendations
- Session-based content sequencing

### Phase 2: Advanced AI
- LangChain integration for learner context
- FAISS for semantic content search
- Pronunciation accuracy with ML models
- Predictive learning paths

### Phase 3: Full Personalization
- Individual learner profiling
- Multi-dimensional learning analytics
- Intelligent content generation
- Real-time adaptation

## Documentation

### For Developers
- API documentation at `http://localhost:8000/docs` (Swagger UI)
- Database schema in `models.py`
- Frontend components in `screens/`

### For AI Team
- Analytics data structure in `schemas.py`
- Progress tracking flow in `main.py`
- Data collection points identified in all modules

### For Educators
- Learning module descriptions
- Progress interpretation guide
- Assessment criteria

## Support & Contact

For questions about this prototype:
1. Check API documentation at `/docs`
2. Review database with `view_database.py`
3. Test endpoints with Postman/curl
4. Contact: development team

## License

Educational project - DiazApps 2026

---

**Status**: Prototype Ready for AI Integration Phase  
**Version**: 1.0.0-alpha  
**Last Updated**: January 6, 2026
