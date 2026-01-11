import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { useUser } from '../state/UserContext';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      // TODO: Implement actual authentication
      const success = await login(email, password);
      if (success) {
        navigation.navigate('Home' as never);
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password recovery feature coming soon!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>MiABC</Text>
            <Text style={styles.betaText}>Beta</Text>
          </View>
          <Text style={styles.subtitle}>An Educational App</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.iconLabel}>
              <Text style={styles.iconText}>📧</Text>
              <Text style={styles.labelText}>EMAIL</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={theme.colors.gray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.iconLabel}>
              <Text style={styles.iconText}>🔒</Text>
              <Text style={styles.labelText}>PASSWORD</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={theme.colors.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>
              Forgot your password?{' '}
              <Text style={styles.recoverLink}>Recover it</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Registration' as never)}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.accessCodeText}>
            Use the access code in the{' '}
            <Text style={styles.registerLink}>Register</Text> box
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightPeach,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
  },
  betaText: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.darkGray,
    marginTop: theme.spacing.md,
  },
  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconText: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.darkGray,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.darkGray,
  },
  recoverLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.darkGray,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  registerText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  accessCodeText: {
    textAlign: 'center',
    marginTop: theme.spacing.md,
    fontSize: 12,
    color: theme.colors.darkGray,
  },
  registerLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
