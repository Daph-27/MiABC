import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getAllWords } from '../../database/api';

export default function SonidosScreen() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const result = await getAllWords();
      console.log('Loaded words:', result?.length || 0);
      
      // Filter words that have at least one sound
      const wordsWithSound = result.filter(w => {
        const hasSound = w.englishSound || w.spanishSound || w.tamilPronunciation;
        if (hasSound) {
          console.log(`Word ${w.englishName} has sounds:`, {
            english: !!w.englishSound,
            spanish: !!w.spanishSound,
            tamil: !!w.tamilPronunciation
          });
        }
        return hasSound;
      });
      
      console.log('Words with sound:', wordsWithSound.length);
      setWords(wordsWithSound);
    } catch (error) {
      console.error('Error loading words:', error);
      Alert.alert('Error', 'Could not load sounds: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (uri, language) => {
    if (!uri) {
      Alert.alert('No Audio', `No ${language} audio available`);
      return;
    }
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Error', 'Could not play audio');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sounds / Sonidos / ஒலிகள்</Text>
      <Text style={styles.subtitle}>Practice pronunciation with audio</Text>
      
      <ScrollView style={styles.wordsList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading sounds...</Text>
        ) : words.length === 0 ? (
          <Text style={styles.emptyText}>No sounds available</Text>
        ) : (
          words.map((word) => (
            <View key={word.id} style={styles.soundCard}>
              {word.imagePath && (
                <Image source={{ uri: word.imagePath }} style={styles.wordImage} />
              )}
              <View style={styles.wordInfo}>
                <Text style={styles.wordEnglish}>{word.englishName}</Text>
                <Text style={styles.wordSpanish}>{word.spanishName}</Text>
                {word.tamilWord && (
                  <Text style={styles.wordTamil}>{word.tamilWord}</Text>
                )}
              </View>
              <View style={styles.audioButtons}>
                {word.englishSound && (
                  <TouchableOpacity
                    style={styles.audioButtonLarge}
                    onPress={() => playAudio(word.englishSound, 'English')}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                    <Text style={styles.audioLabel}>English</Text>
                  </TouchableOpacity>
                )}
                {word.spanishSound && (
                  <TouchableOpacity
                    style={styles.audioButtonLarge}
                    onPress={() => playAudio(word.spanishSound, 'Spanish')}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                    <Text style={styles.audioLabel}>Español</Text>
                  </TouchableOpacity>
                )}
                {word.tamilPronunciation && (
                  <TouchableOpacity
                    style={styles.audioButtonLarge}
                    onPress={() => playAudio(word.tamilPronunciation, 'Tamil')}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                    <Text style={styles.audioLabel}>தமிழ்</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2196F3', padding: 15, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', paddingBottom: 10 },
  wordsList: { flex: 1, padding: 15 },
  loadingText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 20 },
  soundCard: { backgroundColor: '#F9F9F9', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 2 },
  wordImage: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10, backgroundColor: '#E0E0E0' },
  wordInfo: { marginBottom: 15 },
  wordEnglish: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  wordSpanish: { fontSize: 18, color: '#666', marginTop: 3 },
  wordTamil: { fontSize: 18, color: '#9C27B0', marginTop: 3 },
  audioButtons: { flexDirection: 'row', justifyContent: 'space-around', gap: 10 },
  audioButtonLarge: { flex: 1, backgroundColor: '#E3F2FD', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, alignItems: 'center', elevation: 1 },
  audioIcon: { fontSize: 24, marginBottom: 5 },
  audioLabel: { fontSize: 12, fontWeight: 'bold', color: '#2196F3' },
});
