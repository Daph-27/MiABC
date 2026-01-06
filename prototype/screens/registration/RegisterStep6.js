import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterStep6({ navigation, route }) {
  const [email, setEmail] = useState('');
  const params = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.instruction}>Enter the email address, this will be used for login</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email address" 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep7', { ...params, email })}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 },
  content: { flex: 1, padding: 20 },
  instruction: { fontSize: 14, color: '#666', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
