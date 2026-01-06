import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import { getWordsByInitial } from '../../database/api';

export default function PalabrasScreen({ navigation }) {
  const [words, setWords] = useState([]);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const loadWords = async (letter) => {
    try {
      const result = await getWordsByInitial(letter + letter.toLowerCase());
      setWords(result);
    } catch (error) {
      console.error('Error loading words:', error);
    }
  };

  const playAudio = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Words / Palabras</Text>
      
      <ScrollView horizontal style={styles.alphabetScroll}>
        {alphabet.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={styles.letterButton}
            onPress={() => loadWords(letter)}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.wordsList}>
        {words.map((word, index) => (
          <View key={index} style={styles.wordCard}>
            {word.imagePath ? (
              <Image source={{ uri: word.imagePath }} style={styles.wordImage} />
            ) : null}
            <View style={styles.wordInfo}>
              <Text style={styles.wordSpanish}>{word.spanishName}</Text>
              <Text style={styles.wordEnglish}>{word.englishName}</Text>
              {word.tamilWord ? (
                <Text style={styles.wordTamil}>{word.tamilWord}</Text>
              ) : null}
              <Text style={styles.wordSyllables}>{word.spanishBreakUp}</Text>
            </View>
            <View style={styles.audioButtons}>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => playAudio(word.spanishSound)}
              >
                <Text>🔊 ES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => playAudio(word.englishSound)}
              >
                <Text>🔊 EN</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF6B6B', padding: 20 },
  alphabetScroll: { maxHeight: 60, backgroundColor: '#F5F5F5', paddingHorizontal: 10 },
  letterButton: { backgroundColor: '#FF6B6B', margin: 5, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  letterText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  wordsList: { flex: 1, padding: 15 },
  wordCard: { flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 2 },
  wordImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  wordInfo: { flex: 1, justifyContent: 'center' },
  wordSpanish: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  wordEnglish: { fontSize: 16, color: '#666', marginTop: 3 },
  wordTamil: { fontSize: 16, color: '#9C27B0', marginTop: 3 },
  wordSyllables: { fontSize: 14, color: '#999', marginTop: 3 },
  audioButtons: { justifyContent: 'center' },
  audioButton: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 5, marginVertical: 3 },
});
