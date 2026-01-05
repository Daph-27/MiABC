import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../../database/api';

export default function RegisterStep12({ navigation, route }) {
  const handleFinish = async () => {
    try {
      await registerUser(route.params);
      Alert.alert('Success!', 'Registration completed successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not complete registration');
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>STEP : 12</Text>
      <View style={styles.content}>
        <Text style={styles.logo}>Mi ABC</Text>
        <Text style={styles.title}>Successfully registered!</Text>
        <Text style={styles.subtitle}>LOGIN</Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>FINISH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#FFF' }, 
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20, position: 'absolute', top: 0, left: 0 }, 
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }, 
  logo: { fontSize: 48, fontWeight: 'bold', color: '#FF6B6B', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FF6B6B', textAlign: 'center', marginBottom: 20 }, 
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  button: { backgroundColor: '#0000FF', paddingHorizontal: 60, paddingVertical: 18, borderRadius: 25 }, 
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 } 
});
