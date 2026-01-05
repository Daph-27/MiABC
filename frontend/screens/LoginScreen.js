import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../database/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const user = await loginUser(email, password);
      if (user) {
        navigation.replace('Main');
      } else {
        Alert.alert('Error', 'Incorrect credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error logging in');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Mi ABC</Text>
        <Text style={styles.subtitle}>WELCOME!</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegisterStep0')}>
          <Text style={styles.linkText}>Forgot your password? Recover it</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegisterStep0')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Use the access code from the box to Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logoContainer: {
    backgroundColor: '#FF6B6B',
    padding: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  registerText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
    fontSize: 12,
  },
});
