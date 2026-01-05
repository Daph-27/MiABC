import { Platform } from 'react-native';

// API Configuration - Automatically detects platform
// For Android Emulator: http://10.0.2.2:8000/api
// For iOS Simulator/Web: http://localhost:8000/api
// For Physical Device: http://YOUR_COMPUTER_IP:8000/api (change this)

const getApiBaseUrl = () => {
  if (Platform.OS === 'android') {
    // Android Emulator uses 10.0.2.2 to access host machine's localhost
    return 'http://10.0.2.2:8000/api';
  } else if (Platform.OS === 'ios') {
    // iOS Simulator can use localhost
    return 'http://localhost:8000/api';
  } else if (Platform.OS === 'web') {
    // Web browser uses localhost
    return 'http://localhost:8000/api';
  } else {
    // For physical devices, you need to use your computer's IP address
    // Find your IP with: ipconfig (Windows) or ifconfig (Mac/Linux)
    return 'http://localhost:8000/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

console.log(`API URL for ${Platform.OS}:`, API_BASE_URL);

// Store auth token
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => {
  return authToken;
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Initialize database (not needed for API, but keeping for compatibility)
export const initDatabase = async () => {
  console.log('Using API backend, no local database initialization needed');
  return Promise.resolve();
};

// ========== AUTHENTICATION ==========

export const registerUser = async (userData) => {
  try {
    const response = await apiRequest('/register', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({
        accessCode: userData.accessCode,
        guardianName: userData.representativeName,
        guardianRelation: 'Guardian',
        guardianEmail: userData.email,
        guardianPhone: userData.representativePhone,
        learnerName: userData.learnerName,
        learnerAge: null,
        learnerGrade: userData.learnerGrade,
        username: userData.email,
        password: userData.password,
        parentalLock: userData.parentalPassword,
        profilePhoto: userData.profileImage,
      }),
    });

    // Store the token
    setAuthToken(response.access_token);
    return response.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await apiRequest('/login', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ username, password }),
    });

    // Store the token
    setAuthToken(response.access_token);
    return response.user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  return await apiRequest('/me');
};

// ========== USER OPERATIONS ==========

export const createUser = async (userData) => {
  return await registerUser(userData);
};

export const getUser = async (email, password) => {
  return await loginUser(email, password);
};

export const getUserById = async (userId) => {
  return await apiRequest(`/users/${userId}`);
};

export const updateUser = async (userId, userData) => {
  return await apiRequest(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

// ========== FAMILY MEMBER OPERATIONS ==========

export const getFamilyMembers = async () => {
  return await apiRequest('/family-members');
};

export const addFamilyMember = async (memberData) => {
  return await apiRequest('/family-members', {
    method: 'POST',
    body: JSON.stringify({
      name: memberData.name,
      relation: memberData.syllables || 'Family',
      photoUri: memberData.imagePath,
    }),
  });
};

export const deleteFamilyMember = async (memberId) => {
  return await apiRequest(`/family-members/${memberId}`, {
    method: 'DELETE',
  });
};

// ========== WORD OPERATIONS ==========

export const getAllWords = async () => {
  return await apiRequest('/words');
};

export const getWordsByInitial = async (initial) => {
  return await apiRequest(`/words/initial/${initial}`);
};

export const getWordsByType = async (type) => {
  return await apiRequest(`/words/type/${type}`);
};

export const getWord = async (wordId) => {
  return await apiRequest(`/words/${wordId}`);
};

export const addWord = async (wordData) => {
  return await apiRequest('/words', {
    method: 'POST',
    body: JSON.stringify({
      englishName: wordData.englishName,
      englishSound: wordData.englishSound,
      spanishName: wordData.spanishName,
      spanishSound: wordData.spanishSound,
      tamilWord: wordData.tamilWord,
      tamilPronunciation: wordData.tamilPronunciation,
      imagePath: wordData.imagePath,
      initials: wordData.initials,
      recordFlag: wordData.recordFlag,
      key: wordData.key,
      type: wordData.type,
      tema: wordData.tema,
      letra: wordData.letra,
    }),
  });
};

export const updateWord = async (wordId, wordData) => {
  return await apiRequest(`/words/${wordId}`, {
    method: 'PUT',
    body: JSON.stringify(wordData),
  });
};

export const deleteWord = async (wordId) => {
  return await apiRequest(`/words/${wordId}`, {
    method: 'DELETE',
  });
};

// ========== READING TEXT OPERATIONS ==========

export const getReadingTexts = async () => {
  return await apiRequest('/reading-texts');
};

export const getReadingText = async (textId) => {
  return await apiRequest(`/reading-texts/${textId}`);
};

export const addReadingText = async (textData) => {
  return await apiRequest('/reading-texts', {
    method: 'POST',
    body: JSON.stringify({
      title: textData.title,
      content: textData.content,
      language: 'english',
      level: textData.difficulty,
    }),
  });
};

export const deleteReadingText = async (textId) => {
  return await apiRequest(`/reading-texts/${textId}`, {
    method: 'DELETE',
  });
};

// Backward compatibility - keeping old function names
export const insertDefaultWords = () => {
  console.log('Words are now managed via API');
  return Promise.resolve();
};
