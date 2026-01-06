import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterStep12({ navigation, route }) {
  const handleFinish = () => {
    // No backend validation - accept any registration
    // Navigate directly to Login for prototype
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
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
