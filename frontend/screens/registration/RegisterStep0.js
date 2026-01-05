import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterStep0({ navigation }) {
  const [accessCode, setAccessCode] = useState('');

  const handleNext = () => {
    if (accessCode) {
      navigation.navigate('RegisterStep1', { accessCode });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>STEP : 0</Text>
      
      <View style={styles.content}>
        <Text style={styles.label}>Access Code</Text>
        <Text style={styles.instruction}>
          Enter the access code from the MiABC+ box to register
        </Text>
        
        <Text style={styles.fieldLabel}>Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the access code from the MiABC+ box"
          value={accessCode}
          onChangeText={setAccessCode}
          autoCapitalize="characters"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCancel}>
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  step: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  buttonCancel: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonNext: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
