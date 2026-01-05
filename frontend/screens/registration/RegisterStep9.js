import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterStep9({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 9</Text>
      <View style={styles.content}>
        <Text style={styles.instruction}>Grabación de frase para internet</Text>
        <View style={styles.recordButtons}>
          <TouchableOpacity style={[styles.recordButton, { backgroundColor: '#FF0000' }]}>
            <Text style={styles.recordText}>🎤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.recordButton, { backgroundColor: '#0000FF' }]}>
            <Text style={styles.recordText}>▶️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>ANTERIOR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep10', route.params)}>
            <Text style={styles.buttonText}>SIGUIENTE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#FFF' }, 
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 }, 
  content: { flex: 1, padding: 20, alignItems: 'center' }, 
  instruction: { fontSize: 14, color: '#666', marginBottom: 40, textAlign: 'center' }, 
  recordButtons: { flexDirection: 'row', gap: 20, marginBottom: 40 }, 
  recordButton: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }, 
  recordText: { fontSize: 30 }, 
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', width: '100%' }, 
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' }, 
  buttonText: { color: '#FFF', fontWeight: 'bold' } 
});
