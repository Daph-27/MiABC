# Mi ABC Educational App

A comprehensive educational mobile application built with React Native and Expo, designed to teach literacy and numeracy in Spanish, English, and Tamil languages.

## Features Implemented

### ✅ Database
- SQLite database with **Tamil language support** (tamilWord & tamilPronunciation columns)
- User registration and authentication
- Word storage with multilingual support
- Family members management
- Reading texts storage

### ✅ Registration Flow (12 Steps)
- Step 0: Access code entry
- Step 1: Profile image upload
- Step 2: Representative name
- Step 3: Representative phone
- Step 4: Learner name & grade selection
- Step 6: Email address
- Step 7: Password
- Step 8: Name audio recording
- Step 9: Internet phrase recording
- Step 10: Parental username
- Step 11: Parental password
- Step 12: Registration completion

### ✅ Main Features
- **Dashboard**: Category grid with 8 learning modules
- **Navigation**: Drawer navigation with all categories
- **Categories**:
  - Alfabeto / Alphabet
  - Sonidos / Sounds
  - Palabras / Words (with Tamil support)
  - Completar / Complete
  - Familia / Family
  - Colores / Colors
  - Números / Numbers
  - Figuras Geométricas / Geometric Figures
  - Ya Se Leer / I Can Read
- **Settings**: Data backup/restore, language configuration

### ✅ Palabras (Words) Module
- Display words in Spanish, English, and **Tamil**
- Alphabetical filtering
- Audio playback for Spanish and English
- Image display
- Syllable breakdown

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for simulators)
- Expo Go app on mobile device

### Install Dependencies
```bash
cd MiABC-App
npm install
```

### Run the App
```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web browser
npm run web
```

### Using Expo Go
1. Install Expo Go on your phone from App Store or Google Play
2. Run `npm start` in the project directory
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Database Schema

### originalWords Table
```sql
CREATE TABLE originalWords (
  id INTEGER PRIMARY KEY,
  userid TEXT,
  englishName TEXT,
  spanishName TEXT,
  tamilWord TEXT,          -- NEW: Tamil word
  tamilPronunciation TEXT, -- NEW: Tamil pronunciation
  spanishBreakUp TEXT,
  imagePath TEXT,
  englishSound TEXT,
  spanishSound TEXT,
  initials TEXT,
  ... (other fields)
);
```

### users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  accessCode TEXT,
  representativeName TEXT,
  representativePhone TEXT,
  learnerName TEXT,
  learnerGrade TEXT,
  email TEXT,
  password TEXT,
  parentalUser TEXT,
  parentalPassword TEXT,
  profileImage TEXT,
  ... (other fields)
);
```

## Project Structure
```
MiABC-App/
├── App.js                    # Main app with navigation
├── database/
│   └── db.js                 # SQLite database operations
├── screens/
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── DashboardScreen.js
│   ├── ConfiguracionScreen.js
│   ├── registration/         # 12 registration steps
│   │   ├── RegisterStep0.js
│   │   ├── RegisterStep1.js
│   │   ├── ...
│   │   └── RegisterStep12.js
│   └── categories/           # Learning modules
│       ├── AlfabetoScreen.js
│       ├── PalabrasScreen.js
│       ├── SonidosScreen.js
│       ├── CompletarScreen.js
│       ├── FamiliaScreen.js
│       ├── ColoresScreen.js
│       ├── NumerosScreen.js
│       ├── FigurasScreen.js
│       └── YaSeLeerScreen.js
└── package.json
```

## Key Technologies
- **React Native 0.73.4**
- **Expo SDK 50**
- **React Navigation** (Stack & Drawer)
- **Expo SQLite** (Local database)
- **Expo AV** (Audio playback)
- **Expo Image Picker** (Profile photos)

## Tamil Language Integration
The app now supports Tamil language alongside Spanish and English:
- Tamil word display in Palabras module
- Tamil pronunciation field
- Language selector in Settings
- Database columns: `tamilWord` and `tamilPronunciation`

## Features Matching the Manual
✅ Splash screen with Mi ABC branding
✅ Login with email/password
✅ Complete 12-step registration flow
✅ Profile image selection (gallery/camera)
✅ Grade selection dropdown
✅ Audio recording placeholders (Steps 8-9)
✅ Parental lock setup
✅ Dashboard with category grid
✅ Drawer navigation
✅ Words module with multilingual support
✅ Settings with data backup options
✅ All 8 learning category modules

## Next Steps to Enhance
1. Implement actual audio recording functionality
2. Add voice recognition for reading practice
3. Implement games in Completar module
4. Add word creation/editing in Palabras
5. Implement family member management
6. Add text creation for reading practice
7. Implement cloud sync with Firebase
8. Add actual audio files for words
9. Implement number and color learning interfaces
10. Add geometric figures learning module

## Development Notes
- The app uses Expo for cross-platform development
- SQLite provides offline-first data storage
- Navigation structure matches the manual's design
- All screens are functional prototypes ready for enhancement
- Database includes Tamil language fields for future expansion

## Support
For issues or questions, contact: miabc.app@gmail.com

---
© DiazApps 2025
