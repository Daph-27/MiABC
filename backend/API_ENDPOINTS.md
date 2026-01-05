# MiABC Backend - API Endpoints Summary

## 🔌 Base URL
```
http://localhost:8000
```

For mobile testing:
- Android Emulator: `http://10.0.2.2:8000`
- Physical Device: `http://YOUR_COMPUTER_IP:8000`

---

## 🔐 Authentication Endpoints

### 1. Register New User
```http
POST /api/register
Content-Type: application/json

{
  "accessCode": "ABC123",
  "guardianName": "John Doe",
  "guardianRelation": "Father",
  "guardianEmail": "john@example.com",
  "guardianPhone": "+1234567890",
  "learnerName": "Jane Doe",
  "learnerAge": 6,
  "learnerGrade": "1st Grade",
  "username": "jane_doe",
  "password": "securepass123",
  "parentalLock": "1234",
  "profilePhoto": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "userId": 1,
    "accessCode": "ABC123",
    "guardianName": "John Doe",
    "learnerName": "Jane Doe",
    "username": "jane_doe",
    ...
  }
}
```

### 2. Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "jane_doe",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": { ... }
}
```

### 3. Get Current User
```http
GET /api/me
Authorization: Bearer <token>
```

---

## 👤 User Endpoints

### Get User by ID
```http
GET /api/users/{user_id}
Authorization: Bearer <token>
```

### Update User
```http
PUT /api/users/{user_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "guardianName": "Updated Name",
  "learnerGrade": "2nd Grade",
  ...
}
```

---

## 👨‍👩‍👧‍👦 Family Member Endpoints

### Get All Family Members
```http
GET /api/family-members
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Mom",
    "relation": "Mother",
    "photoUri": "https://...",
    "createdAt": "2026-01-05T10:30:00"
  }
]
```

### Create Family Member
```http
POST /api/family-members
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dad",
  "relation": "Father",
  "photoUri": "https://..."
}
```

### Delete Family Member
```http
DELETE /api/family-members/{member_id}
Authorization: Bearer <token>
```

---

## 📝 Word Endpoints

### Get All Words
```http
GET /api/words
```

**Response:**
```json
[
  {
    "id": 1,
    "englishName": "Apple",
    "spanishName": "Manzana",
    "tamilWord": "ஆப்பிள்",
    "tamilPronunciation": "āppiḷ",
    "englishSound": "https://...",
    "spanishSound": "https://...",
    "imagePath": "https://...",
    "initials": "Aa",
    "type": "fruit",
    ...
  }
]
```

### Get Words by Initial Letter
```http
GET /api/words/initial/A
```

### Get Words by Type
```http
GET /api/words/type/fruit
```

### Get Word by ID
```http
GET /api/words/{word_id}
```

### Create Word
```http
POST /api/words
Authorization: Bearer <token>
Content-Type: application/json

{
  "englishName": "Banana",
  "spanishName": "Plátano",
  "tamilWord": "வாழைப்பழம்",
  "tamilPronunciation": "vāḻaippaḻam",
  "englishSound": "https://...",
  "spanishSound": "https://...",
  "imagePath": "https://...",
  "initials": "Bb",
  "type": "fruit"
}
```

### Update Word
```http
PUT /api/words/{word_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "englishName": "Updated Name",
  ...
}
```

### Delete Word
```http
DELETE /api/words/{word_id}
Authorization: Bearer <token>
```

---

## 📖 Reading Text Endpoints

### Get All Reading Texts
```http
GET /api/reading-texts
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "The Cat and the Hat",
    "content": "Once upon a time...",
    "language": "english",
    "level": "beginner",
    "createdAt": "2026-01-05T10:30:00",
    "updatedAt": "2026-01-05T10:30:00"
  }
]
```

### Create Reading Text
```http
POST /api/reading-texts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Story",
  "content": "This is a reading practice text...",
  "language": "english",
  "level": "beginner"
}
```

### Get Reading Text by ID
```http
GET /api/reading-texts/{text_id}
Authorization: Bearer <token>
```

### Delete Reading Text
```http
DELETE /api/reading-texts/{text_id}
Authorization: Bearer <token>
```

---

## 🔑 Authentication Flow

1. **Register or Login** → Get JWT token
2. **Store token** → Frontend automatically stores in memory
3. **Use token** → All subsequent requests include `Authorization: Bearer <token>`
4. **Token expires** → After 7 days (configurable)

---

## ⚡ Example Usage in React Native

```javascript
import { loginUser, getAllWords, addFamilyMember } from './database/api';

// Login
const user = await loginUser('jane_doe', 'securepass123');

// Get words
const words = await getAllWords();

// Add family member
const member = await addFamilyMember({
  name: 'Sister',
  relation: 'Sibling',
  photoUri: 'https://...'
});
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST "http://localhost:8000/api/register" \
  -H "Content-Type: application/json" \
  -d '{
    "accessCode": "TEST123",
    "guardianName": "Test User",
    "learnerName": "Test Child",
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Login
```bash
curl -X POST "http://localhost:8000/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Get Words (with token)
```bash
curl -X GET "http://localhost:8000/api/words" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Response Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🛠️ Error Response Format

```json
{
  "detail": "Error message describing what went wrong"
}
```

---

## 📝 Notes

- All authenticated endpoints require `Authorization: Bearer <token>` header
- Token is automatically included by the frontend API service
- Passwords are hashed with bcrypt (never stored in plain text)
- All timestamps are in UTC
- Word endpoints (GET) don't require authentication for public access
- User-specific endpoints require valid authentication token
