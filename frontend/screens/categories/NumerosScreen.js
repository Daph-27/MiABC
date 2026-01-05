import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getWordsByType } from '../../database/api';

export default function NumerosScreen() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNumbers();
  }, []);

  const loadNumbers = async () => {
    try {
      const result = await getWordsByType('number');
      setNumbers(result);
    } catch (error) {
      console.error('Error loading numbers:', error);
      Alert.alert('Error', 'Could not load numbers');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (uri) => {
    if (!uri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Numbers / Números / எண்கள்</Text>
      <ScrollView style={styles.numbersList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading numbers...</Text>
        ) : numbers.length === 0 ? (
          <Text style={styles.emptyText}>No numbers available</Text>
        ) : (
          numbers.map((number) => (
            <View key={number.id} style={styles.numberCard}>
              {number.imagePath && (
                <Image source={{ uri: number.imagePath }} style={styles.numberImage} />
              )}
              <View style={styles.numberInfo}>
                <Text style={styles.numberEnglish}>{number.englishName}</Text>
                <Text style={styles.numberSpanish}>{number.spanishName}</Text>
                {number.tamilWord && <Text style={styles.numberTamil}>{number.tamilWord}</Text>}
              </View>
              <View style={styles.audioButtons}>
                {number.englishSound && (
                  <TouchableOpacity style={styles.audioBtn} onPress={() => playAudio(number.englishSound)}>
                    <Text>🔊 EN</Text>
                  </TouchableOpacity>
                )}
                {number.spanishSound && (
                  <TouchableOpacity style={styles.audioBtn} onPress={() => playAudio(number.spanishSound)}>
                    <Text>🔊 ES</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#FF5722', padding: 15, textAlign: 'center' },
  numbersList: { flex: 1, padding: 15 },
  loadingText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 20 },
  numberCard: { flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 2, alignItems: 'center' },
  numberImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15, backgroundColor: '#E0E0E0' },
  numberInfo: { flex: 1 },
  numberEnglish: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  numberSpanish: { fontSize: 16, color: '#666', marginTop: 3 },
  numberTamil: { fontSize: 16, color: '#9C27B0', marginTop: 3 },
  audioButtons: { gap: 5 },
  audioBtn: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 5, alignItems: 'center' },
});
