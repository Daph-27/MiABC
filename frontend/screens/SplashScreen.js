import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 3 seconds to show the splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/icon.png')} 
        style={styles.appLogo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Mi ABC</Text>
      <Text style={styles.subtitle}>Educational App for Literacy Learning</Text>
      <Text style={styles.languages}>English • Español • தமிழ்</Text>
      <Text style={styles.tagline}>by DiazApps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appLogo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  appName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  languages: {
    fontSize: 16,
    color: '#FFE0B2',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 14,
    color: '#FFE0B2',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
