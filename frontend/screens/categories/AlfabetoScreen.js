import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function AlfabetoScreen() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alphabet / Alfabeto</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {alphabet.map((letter) => (
          <TouchableOpacity key={letter} style={styles.letterCard}>
            <Text style={styles.letter}>{letter}{ letter.toLowerCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', padding: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-around' },
  letterCard: { width: '30%', aspectRatio: 1, backgroundColor: '#4CAF50', margin: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  letter: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
});
