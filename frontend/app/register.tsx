import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthBackground from '../components/AuthBackground';
import { authService, ApiError } from '../services/api';

import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const GRADES = ['Preschool', 'Junior KG', 'Senior KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

export default function RegisterScreen() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    // Registration State
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [accessCode, setAccessCode] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianPhone, setGuardianPhone] = useState('');
    const [learnerName, setLearnerName] = useState('');
    const [learnerGrade, setLearnerGrade] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [parentUsername, setParentUsername] = useState('');
    const [parentPassword, setParentPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Audio State
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Cleanup audio
    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appto access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
        }
    };

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);
    };

    const playRecording = async () => {
        if (!audioUri) return;
        setIsPlaying(true);
        const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
        setSound(sound);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                setIsPlaying(false);
            }
        });
    };

    const handleRegister = async () => {
        // Validate required fields
        if (!accessCode.trim() || !guardianName.trim() || !learnerName.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all required fields');
            return false;
        }

        setIsLoading(true);
        try {
            await authService.register({
                accessCode: accessCode.trim(),
                guardianName: guardianName.trim(),
                guardianPhone: guardianPhone.trim() || undefined,
                learnerName: learnerName.trim(),
                learnerGrade: learnerGrade || undefined,
                username: email.trim(),
                password: password,
                parentalLock: parentUsername && parentPassword
                    ? `${parentUsername}:${parentPassword}`
                    : undefined,
                profilePhoto: profilePic || undefined,
            });
            return true;
        } catch (error) {
            if (error instanceof ApiError) {
                Alert.alert('Registration Failed', error.detail);
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = async () => {
        // If we're on step 8, we need to register first
        if (step === 8) {
            const success = await handleRegister();
            if (success) {
                setStep(9);
            }
        } else {
            setStep(s => Math.min(s + 1, 9));
        }
    };

    const prevStep = () => {
        if (step === 1) router.back();
        else setStep(s => s - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Setup Profile Picture</Text>
                        <View style={styles.avatarPlaceholder}>
                            {profilePic ? (
                                <Image source={{ uri: profilePic }} style={styles.avatarImage} />
                            ) : (
                                <Text style={styles.avatarEmoji}>👶</Text>
                            )}
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
                                <Text style={styles.secondaryButtonText}>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
                                <Text style={styles.secondaryButtonText}>Take Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Guardian Information</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Access Code (from school)"
                            value={accessCode}
                            onChangeText={setAccessCode}
                            placeholderTextColor="#999"
                            autoCapitalize="characters"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Guardian Name"
                            value={guardianName}
                            onChangeText={setGuardianName}
                            placeholderTextColor="#999"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={guardianPhone}
                            onChangeText={setGuardianPhone}
                            keyboardType="phone-pad"
                            placeholderTextColor="#999"
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Learner's Information</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Learner Name"
                            value={learnerName}
                            onChangeText={setLearnerName}
                            placeholderTextColor="#999"
                        />
                        <Text style={styles.label}>Select Grade:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gradeScroll}>
                            {GRADES.map(grade => (
                                <TouchableOpacity
                                    key={grade}
                                    style={[styles.gradeChip, learnerGrade === grade && styles.gradeChipActive]}
                                    onPress={() => setLearnerGrade(grade)}
                                >
                                    <Text style={[styles.gradeText, learnerGrade === grade && styles.gradeTextActive]}>{grade}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                );
            case 4:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Login Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email for logging in"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#999"
                        />
                    </View>
                );
            case 5:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Set Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#999"
                        />
                    </View>
                );
            case 6:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Machine Calibration</Text>
                        <Text style={styles.calibrationSub}>Test your voice and audio</Text>
                        <View style={styles.calibrationCircle}>
                            <Text style={{ fontSize: 50 }}>{isRecording ? '⏺️' : isPlaying ? '🔊' : '🎤'}</Text>
                        </View>
                        <View style={styles.calibrationButtons}>
                            <TouchableOpacity
                                style={[styles.calibBtn, { backgroundColor: isRecording ? '#cc0000' : '#ed1c24' }]}
                                onPress={isRecording ? stopRecording : startRecording}
                            >
                                <Text style={styles.calibBtnText}>{isRecording ? 'STOP' : 'RECORD'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.calibBtn, { backgroundColor: isPlaying ? '#0d47a1' : '#2196f3', opacity: audioUri ? 1 : 0.5 }]}
                                onPress={playRecording}
                                disabled={!audioUri || isPlaying}
                            >
                                <Text style={styles.calibBtnText}>{isPlaying ? 'PLAYING...' : 'LISTEN'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 7:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Parental Lock Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username for Parental Lock"
                            value={parentUsername}
                            onChangeText={setParentUsername}
                            placeholderTextColor="#999"
                        />
                    </View>
                );
            case 8:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepTitle}>Parental Lock Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password for Parental Lock"
                            value={parentPassword}
                            onChangeText={setParentPassword}
                            secureTextEntry
                            placeholderTextColor="#999"
                        />
                    </View>
                );
            case 9:
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.successIcon}>
                            <Text style={{ fontSize: 60 }}>🎉</Text>
                        </View>
                        <Text style={styles.successTitle}>miABC Successfully Registered!</Text>
                        <Text style={styles.successSub}>Welcome to the magic world of learning.</Text>
                        <TouchableOpacity style={styles.finishBtn} onPress={() => router.replace('/dashboard')}>
                            <Text style={styles.finishBtnText}>Start Learning</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };


    return (
        <AuthBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <StatusBar style="light" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={prevStep} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${(step / 9) * 100}%` }]} />
                    </View>
                    <Text style={styles.stepCounter}>{step}/9</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
                    <View style={styles.card}>
                        {renderStep()}

                        {step < 9 && (
                            <TouchableOpacity
                                style={[styles.nextButton, isLoading && styles.nextButtonDisabled]}
                                onPress={nextStep}
                                disabled={isLoading}
                            >
                                <LinearGradient colors={['#ed1c24', '#c0151b']} style={styles.buttonGradient}>
                                    {isLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.nextButtonText}>
                                            {step === 8 ? 'REGISTER' : 'NEXT'}
                                        </Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        )}
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
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtnText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    progressContainer: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#fff',
    },
    stepCounter: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 35,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 15,
    },
    stepContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#ed1c24',
        marginBottom: 25,
        textAlign: 'center',
    },
    avatarPlaceholder: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#ed1c24',
        borderStyle: 'dashed',
    },
    avatarEmoji: {
        fontSize: 60,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 70,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 15,
    },
    secondaryButton: {
        backgroundColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    secondaryButtonText: {
        color: '#555',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1.5,
        borderColor: '#eee',
        marginBottom: 15,
        fontWeight: '600',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
    gradeScroll: {
        width: '100%',
        marginBottom: 10,
    },
    gradeChip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    gradeChipActive: {
        backgroundColor: '#fff',
        borderColor: '#ed1c24',
    },
    gradeText: {
        color: '#666',
        fontWeight: '600',
    },
    gradeTextActive: {
        color: '#ed1c24',
    },
    calibrationSub: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    calibrationCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#eee',
    },
    calibrationButtons: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
    },
    calibBtn: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    calibBtnText: {
        color: '#fff',
        fontWeight: '900',
        letterSpacing: 1,
    },
    successIcon: {
        marginBottom: 20,
    },
    successTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#ed1c24',
        textAlign: 'center',
        marginBottom: 10,
    },
    successSub: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: '600',
    },
    finishBtn: {
        backgroundColor: '#ed1c24',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    finishBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    nextButton: {
        marginTop: 10,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#ed1c24',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    nextButtonDisabled: {
        opacity: 0.7,
    },
    buttonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
