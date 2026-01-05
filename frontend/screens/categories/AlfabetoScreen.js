import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getWordsByInitial } from '../../database/api';

export default function AlfabetoScreen() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWords('A');
  }, []);

  const loadWords = async (letter) => {
    setLoading(true);
    setSelectedLetter(letter);
    try {
      const result = await getWordsByInitial(letter);
      setWords(result);
    } catch (error) {
      console.error('Error loading words:', error);
      Alert.alert('Error', 'Could not load words');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (uri, language) => {
    if (!uri) {
      Alert.alert('No Audio', `No ${language} audio available for this word`);
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
      <Text style={styles.title}>Alphabet / Alfabeto / எழுத்துக்கள்</Text>
      
      <ScrollView horizontal style={styles.alphabetScroll} showsHorizontalScrollIndicator={false}>
        {alphabet.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[styles.letterCard, selectedLetter === letter && styles.letterCardActive]}
            onPress={() => loadWords(letter)}
          >
            <Text style={[styles.letter, selectedLetter === letter && styles.letterActive]}>
              {letter}{letter.toLowerCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.wordsList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : words.length === 0 ? (
          <Text style={styles.emptyText}>No words found for letter {selectedLetter}</Text>
        ) : (
          words.map((word) => (
            <View key={word.id} style={styles.wordCard}>
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
                    style={styles.audioButton}
                    onPress={() => playAudio(word.englishSound, 'English')}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                    <Text style={styles.audioLabel}>EN</Text>
                  </TouchableOpacity>
                )}
                {word.spanishSound && (
                  <TouchableOpacity
                    style={styles.audioButton}
                    onPress={() => playAudio(word.spanishSound, 'Spanish')}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                    <Text style={styles.audioLabel}>ES</Text>
                  </TouchableOpacity>
                )}
                {word.tamilPronunciation && (
                  <TouchableOpacity
                    style={styles.audioButton}
                    onPress={() => playAudio(word.tamilPronunciation, 'Tamil')}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                    <Text style={styles.audioLabel}>TA</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50', padding: 15, textAlign: 'center' },
  alphabetScroll: { maxHeight: 80, backgroundColor: '#F5F5F5', paddingVertical: 10 },
  letterCard: { backgroundColor: '#4CAF50', margin: 5, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  letterCardActive: { backgroundColor: '#2E7D32', transform: [{ scale: 1.1 }] },
  letter: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  letterActive: { color: '#FFEB3B' },
  wordsList: { flex: 1, padding: 15 },
  loadingText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 20 },
  wordCard: { flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 2, alignItems: 'center' },
  wordImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15, backgroundColor: '#E0E0E0' },
  wordInfo: { flex: 1 },
  wordEnglish: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  wordSpanish: { fontSize: 16, color: '#666', marginTop: 3 },
  wordTamil: { fontSize: 16, color: '#9C27B0', marginTop: 3 },
  audioButtons: { alignItems: 'center', gap: 5 },
  audioButton: { backgroundColor: '#E3F2FD', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5, alignItems: 'center', minWidth: 50 },
  audioIcon: { fontSize: 16 },
  audioLabel: { fontSize: 10, fontWeight: 'bold', color: '#2196F3' },
});
