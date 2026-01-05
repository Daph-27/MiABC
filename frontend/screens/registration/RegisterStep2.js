import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterStep2({ navigation, route }) {
  const [representativeName, setRepresentativeName] = useState('');
  const { accessCode, profileImage } = route.params;

  const handleNext = () => {
    if (representativeName) {
      navigation.navigate('RegisterStep3', { accessCode, profileImage, representativeName });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>STEP : 2</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Guardian Information</Text>
        <Text style={styles.instruction}>Enter the first name of the learner's guardian</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={representativeName}
          onChangeText={setRepresentativeName}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
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
  container: { flex: 1, backgroundColor: '#FFF' },
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  instruction: { fontSize: 14, color: '#666', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20, fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  buttonCancel: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonNext: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
