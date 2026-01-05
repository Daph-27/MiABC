import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getWordsByType } from '../../database/api';

export default function ColoresScreen() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const result = await getWordsByType('color');
      setColors(result);
    } catch (error) {
      console.error('Error loading colors:', error);
      Alert.alert('Error', 'Could not load colors');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (uri, language) => {
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
      <Text style={styles.title}>Colors / Colores / நிறங்கள்</Text>
      <ScrollView style={styles.colorsList}>
        {loading ? (
          <Text style={styles.loadingText}>Loading colors...</Text>
        ) : colors.length === 0 ? (
          <Text style={styles.emptyText}>No colors available</Text>
        ) : (
          colors.map((color) => (
            <View key={color.id} style={styles.colorCard}>
              {color.imagePath && (
                <Image source={{ uri: color.imagePath }} style={styles.colorImage} />
              )}
              <View style={styles.colorInfo}>
                <Text style={styles.colorEnglish}>{color.englishName}</Text>
                <Text style={styles.colorSpanish}>{color.spanishName}</Text>
                {color.tamilWord && <Text style={styles.colorTamil}>{color.tamilWord}</Text>}
              </View>
              <View style={styles.audioButtons}>
                {color.englishSound && (
                  <TouchableOpacity style={styles.audioBtn} onPress={() => playAudio(color.englishSound)}>
                    <Text>🔊 EN</Text>
                  </TouchableOpacity>
                )}
                {color.spanishSound && (
                  <TouchableOpacity style={styles.audioBtn} onPress={() => playAudio(color.spanishSound)}>
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#00BCD4', padding: 15, textAlign: 'center' },
  colorsList: { flex: 1, padding: 15 },
  loadingText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 20 },
  colorCard: { flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 2, alignItems: 'center' },
  colorImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15, backgroundColor: '#E0E0E0' },
  colorInfo: { flex: 1 },
  colorEnglish: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  colorSpanish: { fontSize: 16, color: '#666', marginTop: 3 },
  colorTamil: { fontSize: 16, color: '#9C27B0', marginTop: 3 },
  audioButtons: { gap: 5 },
  audioBtn: { backgroundColor: '#E3F2FD', padding: 8, borderRadius: 5, alignItems: 'center' },
});
