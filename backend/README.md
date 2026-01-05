# MiABC Backend API

FastAPI backend for the MiABC educational app with Tamil language support.

## Features

- JWT Authentication
- User registration and login
- Family member management
- Word database with trilingual support (English/Spanish/Tamil)
- Reading texts management
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
python main.py
```

Or use uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
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

## Database

SQLite database with the following tables:
- `users` - User accounts
- `familyMembers` - Family member profiles
- `originalWords` - Word database with Tamil support
- `readingTexts` - Reading practice texts

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Token expiration: 7 days (configurable)
