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
        source={require('../assets/icons.png')} 
        style={styles.appLogo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appLogo: {
    width: '90%',
    height: '90%',
    maxWidth: 600,
    maxHeight: 800,
    resizeMode: 'contain',
  },
});
