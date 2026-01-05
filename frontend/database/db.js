import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('miabc.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create originalWords table with Tamil fields
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS originalWords (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userid TEXT,
          englishName TEXT,
          englishSound TEXT,
          imagePath TEXT,
          initials TEXT,
          isComplete TEXT,
          isCreated TEXT,
          isEdited TEXT,
          recordFlag TEXT,
          spanishBreakUp TEXT,
          spanishName TEXT,
          spanishSound TEXT,
          tamilWord TEXT,
          tamilPronunciation TEXT,
          key TEXT,
          type TEXT,
          dateComplete TEXT,
          tema TEXT,
          letra TEXT,
          createdAtDate TEXT,
          createdAtHourMin TEXT,
          updatedAtDate TEXT,
          useridOriginal TEXT
        );`,
        [],
        () => console.log('originalWords table created'),
        (_, error) => {
          console.log('Error creating originalWords table:', error);
          return false;
        }
      );

      // Create users table for registration
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
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
          nameAudio TEXT,
          internetAudio TEXT,
          createdAt TEXT
        );`,
        [],
        () => console.log('users table created'),
        (_, error) => {
          console.log('Error creating users table:', error);
          return false;
        }
      );

      // Create family members table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS familyMembers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userid INTEGER,
          name TEXT,
          syllables TEXT,
          imagePath TEXT,
          audioPath TEXT,
          phrasePath TEXT,
          createdAt TEXT
        );`,
        [],
        () => console.log('familyMembers table created'),
        (_, error) => {
          console.log('Error creating familyMembers table:', error);
          return false;
        }
      );

      // Create reading texts table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS readingTexts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userid INTEGER,
          title TEXT,
          content TEXT,
          format TEXT,
          questionType TEXT,
          difficulty TEXT,
          questionLimit INTEGER,
          createdAt TEXT
        );`,
        [],
        () => {
          console.log('readingTexts table created');
          resolve();
        },
        (_, error) => {
          console.log('Error creating readingTexts table:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// Insert default words
export const insertDefaultWords = () => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO originalWords (englishName, spanishName, spanishBreakUp, imagePath, englishSound, spanishSound, initials, recordFlag, tamilWord, tamilPronunciation) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['Fan', 'Abanico', 'A-ba-ni-co', 'https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/reading%2Fabanico.jpg?alt=media&', 
       'https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Ffan.mp3?alt=media&',
       'https://firebasestorage.googleapis.com/v0/b/miabc-a2e3a.appspot.com/o/audio%2Fabanico.mp3?alt=media&',
       'Ff', 'true', 'விசிறி', 'விசிறி'],
      () => console.log('Sample word inserted'),
      (_, error) => console.log('Error inserting word:', error)
    );
  });
};

// User operations
export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO users (accessCode, representativeName, representativePhone, learnerName, learnerGrade, email, password, parentalUser, parentalPassword, profileImage, nameAudio, internetAudio, createdAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userData.accessCode,
          userData.representativeName,
          userData.representativePhone,
          userData.learnerName,
          userData.learnerGrade,
          userData.email,
          userData.password,
          userData.parentalUser,
          userData.parentalPassword,
          userData.profileImage,
          userData.nameAudio,
          userData.internetAudio,
          new Date().toISOString()
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => resolve(rows._array[0]),
        (_, error) => reject(error)
      );
    });
  });
};

// Words operations
export const getAllWords = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM originalWords',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getWordsByInitial = (initial) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM originalWords WHERE initials = ?',
        [initial],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const addWord = (wordData) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO originalWords (userid, englishName, spanishName, spanishBreakUp, tamilWord, tamilPronunciation, imagePath, englishSound, spanishSound, initials, isCreated, createdAtDate) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          wordData.userid,
          wordData.englishName,
          wordData.spanishName,
          wordData.spanishBreakUp,
          wordData.tamilWord,
          wordData.tamilPronunciation,
          wordData.imagePath,
          wordData.englishSound,
          wordData.spanishSound,
          wordData.initials,
          'true',
          new Date().toISOString()
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Family operations
export const addFamilyMember = (memberData) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO familyMembers (userid, name, syllables, imagePath, audioPath, phrasePath, createdAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          memberData.userid,
          memberData.name,
          memberData.syllables,
          memberData.imagePath,
          memberData.audioPath,
          memberData.phrasePath,
          new Date().toISOString()
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getFamilyMembers = (userid) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM familyMembers WHERE userid = ?',
        [userid],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export default db;
