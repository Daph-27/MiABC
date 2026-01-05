// Remaining registration and dashboard screens - combined
export const Step9 = `import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function RegisterStep9({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 9</Text>
      <View style={styles.content}>
        <Text style={styles.instruction}>Internet phrase recording</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>ANTERIOR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep10', route.params)}><Text style={styles.buttonText}>SIGUIENTE</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF' }, step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 }, content: { flex: 1, padding: 20 }, instruction: { fontSize: 14, marginBottom: 20 }, buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' }, button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' }, buttonText: { color: '#FFF', fontWeight: 'bold' } });`;

export const Step10 = `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
export default function RegisterStep10({ navigation, route }) {
  const [parentalUser, setParentalUser] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 10</Text>
      <View style={styles.content}>
        <Text style={styles.instruction}>Ingresa un nombre de usuario para el bloqueo parental</Text>
        <TextInput style={styles.input} placeholder="Usuario" value={parentalUser} onChangeText={setParentalUser} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>ANTERIOR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep11', { ...route.params, parentalUser })}><Text style={styles.buttonText}>SIGUIENTE</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF' }, step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 }, content: { flex: 1, padding: 20 }, instruction: { fontSize: 14, color: '#666', marginBottom: 20 }, input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 }, buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' }, button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' }, buttonText: { color: '#FFF', fontWeight: 'bold' } });`;

export const Step11 = `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
export default function RegisterStep11({ navigation, route }) {
  const [parentalPassword, setParentalPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 11</Text>
      <View style={styles.content}>
        <Text style={styles.instruction}>Ingresa una contraseña para el usuario de bloqueo parental</Text>
        <TextInput style={styles.input} placeholder="Contraseña parental" value={parentalPassword} onChangeText={setParentalPassword} secureTextEntry />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>ANTERIOR</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep12', { ...route.params, parentalPassword })}><Text style={styles.buttonText}>SIGUIENTE</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF' }, step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 }, content: { flex: 1, padding: 20 }, instruction: { fontSize: 14, color: '#666', marginBottom: 20 }, input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 }, buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' }, button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' }, buttonText: { color: '#FFF', fontWeight: 'bold' } });`;

export const Step12 = `import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUser } from '../../database/db';
export default function RegisterStep12({ navigation, route }) {
  const handleFinish = async () => {
    try {
      await createUser(route.params);
      Alert.alert('¡Éxito!', 'Registro completado', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar el registro');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.step}>PASO : 12</Text>
      <View style={styles.content}>
        <Text style={styles.title}>¡Ha sido registrado exitosamente!</Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}><Text style={styles.buttonText}>FINALIZAR</Text></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }, step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20, position: 'absolute', top: 0, left: 0 }, content: { alignItems: 'center', padding: 40 }, title: { fontSize: 20, fontWeight: 'bold', color: '#FF6B6B', textAlign: 'center', marginBottom: 40 }, button: { backgroundColor: '#0000FF', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 5 }, buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 } });`;
