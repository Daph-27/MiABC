import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function CompletarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete / Completar</Text>
      <Text style={styles.description}>Word completion games</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#9C27B0', marginBottom: 10 },
  description: { fontSize: 18, color: '#666' },
});
