import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { useUser } from '../state/UserContext';

export const SplashScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Check authentication status after a short delay
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.navigate('Home' as never);
      } else {
        navigation.navigate('Login' as never);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MiABC</Text>
        <Text style={styles.betaText}>Beta</Text>
      </View>
      <Text style={styles.subtitle}>An Educational App</Text>
      
      <View style={styles.footer}>
        <Text style={styles.copyright}>© DiazApps 2025</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 60,
    paddingVertical: 40,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.lg,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  betaText: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  subtitle: {
    fontSize: 20,
    color: theme.colors.white,
    marginTop: theme.spacing.lg,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
  },
  copyright: {
    fontSize: 14,
    color: theme.colors.white,
    opacity: 0.8,
  },
});
