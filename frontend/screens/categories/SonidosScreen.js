import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SonidosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sounds / Sonidos</Text>
      <Text style={styles.description}>Simple and Compound</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2196F3', marginBottom: 10 },
  description: { fontSize: 18, color: '#666' },
});
