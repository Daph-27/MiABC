import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { getCurrentUser } from '../database/api';

export default function ConfiguracionScreen() {
  const [userData, setUserData] = useState({
    learnerName: 'Loading...',
    guardianEmail: 'Loading...',
    learnerGrade: 'Loading...',
  });
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserData({
          learnerName: user.learnerName,
          guardianEmail: user.guardianEmail,
          learnerGrade: user.learnerGrade,
        });
      }
    } catch (error) {
      console.log('Error loading user data:', error);
      Alert.alert('Error', 'Could not load user data');
    }
  };

  const handleSaveData = async () => {
    Alert.alert('Save Data', 'Data backup feature will be implemented soon');
  };

  const handleDownloadData = async () => {
    Alert.alert('Download Data', 'Data restore feature will be implemented soon');
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    Alert.alert('Language Changed', `Language set to ${language}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings / Configuración / அமைப்புகள்</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Data</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.learnerName}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.guardianEmail}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Grade:</Text>
          <Text style={styles.value}>{userData.learnerGrade}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Backup</Text>
        <TouchableOpacity style={styles.button} onPress={handleSaveData}>
          <Text style={styles.buttonText}>⬆️ SAVE DATA TO ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleDownloadData}>
          <Text style={styles.buttonText}>⬇️ DOWNLOAD DATA</Text>
        </TouchableOpacity>
        <Text style={styles.warning}>
          This step is very useful when you want to open the app on a new device.
          We recommend uploading data every time you add new words.
        </Text>
        <Text style={styles.disclaimer}>
          MiABC is not responsible for data on your device that was not uploaded to the cloud.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Settings / Idioma / மொழி</Text>
        <TouchableOpacity 
          style={[styles.languageButton, selectedLanguage === 'spanish' && styles.languageButtonActive]}
          onPress={() => handleLanguageChange('spanish')}
        >
          <Text style={styles.languageText}>Español 🇪🇸</Text>
          {selectedLanguage === 'spanish' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.languageButton, selectedLanguage === 'english' && styles.languageButtonActive]}
          onPress={() => handleLanguageChange('english')}
        >
          <Text style={styles.languageText}>English 🇺🇸</Text>
          {selectedLanguage === 'english' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.languageButton, selectedLanguage === 'tamil' && styles.languageButtonActive]}
          onPress={() => handleLanguageChange('tamil')}
        >
          <Text style={styles.languageText}>தமிழ் 🇮🇳</Text>
          {selectedLanguage === 'tamil' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#FF6B6B', padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  section: { backgroundColor: '#FFF', padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  infoCard: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  label: { fontSize: 16, fontWeight: 'bold', width: 100, color: '#666' },
  value: { fontSize: 16, color: '#333' },
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  buttonSecondary: { backgroundColor: '#2196F3' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  warning: { fontSize: 13, color: '#666', marginTop: 15, lineHeight: 20 },
  disclaimer: { fontSize: 12, color: '#F44336', marginTop: 10, fontStyle: 'italic' },
  languageButton: { 
    padding: 15, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 8, 
    marginBottom: 10, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
