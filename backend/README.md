# MiABC Backend API

FastAPI backend for the MiABC educational app with Tamil language support.

## Project Structure

```
backend/
├── app/                          # Main application package
│   ├── __init__.py
│   ├── main.py                   # FastAPI app initialization
│   ├── config.py                 # Settings and configuration
│   ├── database.py               # Database connection
│   ├── dependencies.py           # Shared dependencies (auth)
│   │
│   ├── core/                     # Core utilities
│   │   ├── __init__.py
│   │   ├── security.py           # JWT and password hashing
│   │   └── firebase.py           # Firebase Storage integration
│   │
│   ├── models/                   # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py               # User, FamilyMember
│   │   ├── word.py               # OriginalWord, ReadingText
│   │   └── progress.py           # Progress tracking models
│   │
│   ├── schemas/                  # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── word.py
│   │   └── progress.py
│   │
│   └── routers/                  # API endpoints
│       ├── __init__.py
│       ├── auth.py               # Authentication endpoints
│       ├── users.py              # User management
│       ├── family.py             # Family members
│       ├── words.py              # Word database
│       ├── reading.py            # Reading texts
│       ├── uploads.py            # File uploads
│       ├── progress.py           # Progress tracking
│       └── analytics.py          # Learning analytics
│
├── scripts/                      # Utility scripts
│   ├── import_words_from_sql.py
│   ├── populate_tamil_words.py
│   └── view_database.py
│
├── data/                         # Data files
│   ├── miabc.db                  # SQLite database
│   └── originalWords.sql         # Word data SQL
│
├── run.py                        # Application entry point
├── requirements.txt              # Python dependencies
├── .env                          # Environment variables
├── .gitignore
└── README.md
```

## Features

- JWT Authentication
- User registration and login
- Family member management
- Word database with trilingual support (English/Spanish/Tamil)
- Reading texts management
- Learner progress tracking
- Learning analytics
- Firebase Storage integration
- RESTful API endpoints

## Setup

1. Install Python 3.8 or higher

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure environment variables:
Edit `.env` file and set your SECRET_KEY

6. Run the server:
```bash
python run.py
```

Or use uvicorn directly:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login and get JWT token
- `GET /api/me` - Get current user info

### Users
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user

### Family Members
- `GET /api/family-members` - Get all family members
- `POST /api/family-members` - Create family member
- `DELETE /api/family-members/{member_id}` - Delete family member

### Words
- `GET /api/words` - Get all words
- `GET /api/words/initial/{initial}` - Get words by initial letter
- `GET /api/words/type/{type}` - Get words by type
- `GET /api/words/{word_id}` - Get word by ID
- `POST /api/words` - Create new word
- `PUT /api/words/{word_id}` - Update word
- `DELETE /api/words/{word_id}` - Delete word

### Reading Texts
- `GET /api/reading-texts` - Get all reading texts
- `GET /api/reading-texts/{text_id}` - Get reading text by ID
- `POST /api/reading-texts` - Create reading text
- `DELETE /api/reading-texts/{text_id}` - Delete reading text

### File Uploads
- `POST /api/upload/image` - Upload image to Firebase
- `POST /api/upload/audio` - Upload audio to Firebase
- `POST /api/upload/profile-photo` - Upload profile photo

### Progress Tracking
- `POST /api/progress` - Track learner progress
- `GET /api/progress` - Get learner progress
- `POST /api/quiz/attempt` - Record quiz attempt
- `GET /api/quiz/attempts` - Get quiz attempts
- `POST /api/pronunciation/attempt` - Record pronunciation attempt
- `POST /api/session/start` - Start learning session
- `PUT /api/session/{session_id}` - End learning session

### Analytics
- `GET /api/analytics/overview` - Get comprehensive analytics
- `GET /api/analytics/module/{module_name}` - Get module statistics

## Utility Scripts

Run scripts from the backend directory:

```bash
# View database contents
python -m scripts.view_database

# Import words from SQL file
python -m scripts.import_words_from_sql

# Populate Tamil words
python -m scripts.populate_tamil_words
```

## Database

SQLite database with the following tables:
- `users` - User accounts
- `familyMembers` - Family member profiles
- `originalWords` - Word database with Tamil support
- `readingTexts` - Reading practice texts
- `learnerProgress` - Progress tracking
- `quizAttempts` - Quiz attempt records
- `pronunciationAttempts` - Pronunciation practice records
- `learningSessions` - Learning session tracking

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Token expiration: 7 days (configurable)
