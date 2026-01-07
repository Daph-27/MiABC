import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import { authService, ApiError } from '../services/api';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // Validate inputs
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setIsLoading(true);
        try {
            await authService.login({
                username: username.trim(),
                password: password,
            });
            router.replace('/dashboard');
        } catch (error) {
            if (error instanceof ApiError) {
                Alert.alert('Login Failed', error.detail);
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <StatusBar style="light" />
                <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
                    <View style={styles.header}>
                        <View style={styles.logoCircle}>
                            <Image
                                source={require('../assets/images/logo-icon.png')}
                                style={styles.logo}
                                contentFit="cover"
                            />
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Sign in to your account</Text>

                        <View style={styles.inputGroup}>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#999"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.mainButton, isLoading && styles.mainButtonDisabled]}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.mainButtonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.switchButton}
                            onPress={() => router.push('/register')}
                        >
                            <Text style={styles.switchText}>
                                Don't have an account? <Text style={styles.switchHighlight}>Register Now</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </AuthBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    formContainer: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 35,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#ed1c24',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: '600',
    },
    inputGroup: {
        gap: 15,
        marginBottom: 25,
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 18,
        fontSize: 16,
        color: '#333',
        borderWidth: 1.5,
        borderColor: '#eee',
        fontWeight: '600',
    },
    mainButton: {
        backgroundColor: '#ed1c24',
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#ed1c24',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
        marginBottom: 20,
    },
    mainButtonDisabled: {
        opacity: 0.7,
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    switchButton: {
        alignItems: 'center',
    },
    switchText: {
        color: '#666',
        fontSize: 15,
        fontWeight: '600',
    },
    switchHighlight: {
        color: '#ed1c24',
        fontWeight: 'bold',
    },
});
