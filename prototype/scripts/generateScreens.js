// Template generator for remaining registration screens
export const registerScreens = {
  Step3: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterStep3({ navigation, route }) {
  const [phone, setPhone] = useState('');
  const params = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 3</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Avatar</Text>
        <TextInput style={styles.input} placeholder="Formato: 0000-000-0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>ANTERIOR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep4', { ...params, phone })}><Text style={styles.buttonText}>SIGUIENTE</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});`,

  Step4: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';

export default function RegisterStep4({ navigation, route }) {
  const [learnerName, setLearnerName] = useState('');
  const [grade, setGrade] = useState('Preescolar');
  const params = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 4</Text>
      <View style={styles.content}>
        <TextInput style={styles.input} placeholder="Nombre del aprendiz" value={learnerName} onChangeText={setLearnerName} />
        <Text style={styles.label}>Grado:</Text>
        <View style={styles.pickerContainer}>
          <Text>{grade}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>ANTERIOR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep6', { ...params, learnerName, grade })}><Text style={styles.buttonText}>SIGUIENTE</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 14, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 },
  pickerContainer: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});`,
};

// Generate all files
Object.entries(registerScreens).forEach(([name, content]) => {
  console.log(`Create: RegisterStep${name.replace('Step', '')}.js`);
});
