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
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { useUser } from '../state/UserContext';

interface RegistrationData {
  accessCode: string;
  profileImage: string | null;
  representativeName: string;
  representativePhone: string;
  learnerName: string;
  grade: string;
  email: string;
  password: string;
  congratsPhrase: string;
  learnerNameAudio: string | null;
  parentalUsername: string;
  parentalPassword: string;
}

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  const { register } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>({
    accessCode: '',
    profileImage: null,
    representativeName: '',
    representativePhone: '',
    learnerName: '',
    grade: '',
    email: '',
    password: '',
    congratsPhrase: '',
    learnerNameAudio: null,
    parentalUsername: '',
    parentalPassword: '',
  });

  const grades = [
    'PreK',
    'Kinder',
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
  ];

  const updateFormData = (key: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0: // Access Code
        if (!formData.accessCode) {
          Alert.alert('Required', 'Please enter the access code from the MiABC+ box');
          return false;
        }
        if (formData.accessCode.length !== 6) {
          Alert.alert('Invalid', 'Access code must be 6 digits');
          return false;
        }
        return true;

      case 1: // Profile Image
        // Optional, always valid
        return true;

      case 2: // Representative Name
        if (!formData.representativeName.trim()) {
          Alert.alert('Required', 'Please enter the first name of the representative');
          return false;
        }
        return true;

      case 3: // Representative Phone
        if (!formData.representativePhone) {
          Alert.alert('Required', 'Please enter the representative\'s phone number');
          return false;
        }
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(formData.representativePhone)) {
          Alert.alert('Invalid', 'Please enter phone in format: XXX-XXX-XXXX');
          return false;
        }
        return true;

      case 4: // Learner Name
        if (!formData.learnerName.trim()) {
          Alert.alert('Required', 'Please enter the learner\'s name');
          return false;
        }
        return true;

      case 5: // Grade Selection
        if (!formData.grade) {
          Alert.alert('Required', 'Please select the learner\'s grade');
          return false;
        }
        return true;

      case 6: // Email
        if (!formData.email) {
          Alert.alert('Required', 'Please enter your email address');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          Alert.alert('Invalid', 'Please enter a valid email address');
          return false;
        }
        return true;

      case 7: // Password
        if (!formData.password) {
          Alert.alert('Required', 'Please enter a password');
          return false;
        }
        if (formData.password.length < 6) {
          Alert.alert('Invalid', 'Password must be at least 6 characters');
          return false;
        }
        return true;

      case 8: // Congratulations Phrase
        // Optional
        return true;

      case 9: // Learner Name Audio
        // Optional
        return true;

      case 10: // Parental Username
        if (!formData.parentalUsername.trim()) {
          Alert.alert('Required', 'Please enter a username for parental controls');
          return false;
        }
        return true;

      case 11: // Parental Password
        if (!formData.parentalPassword) {
          Alert.alert('Required', 'Please enter a password for parental controls');
          return false;
        }
        if (formData.parentalPassword.length < 6) {
          Alert.alert('Invalid', 'Password must be at least 6 characters');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 11) {
        setCurrentStep(currentStep + 1);
      } else {
        handleFinish();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleFinish = async () => {
    try {
      // TODO: Implement actual registration
      const success = await register(formData);
      if (success) {
        Alert.alert(
          'Registration Successful!',
          'Your account has been created successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login' as never),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration.');
    }
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [match[1], match[2], match[3]].filter((part) => part);
      return parts.join('-');
    }
    return text;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 0</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Access Code</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.accessCode}
              onChangeText={(text) => updateFormData('accessCode', text)}
              keyboardType="number-pad"
              maxLength={6}
            />
            <Text style={styles.instruction}>
              Enter the 6-digit access code found in the box you registered in this field.
            </Text>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 1</Text>
            <Text style={styles.helpText}>Help?</Text>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageIcon}>👤</Text>
              </View>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>UPLOAD PROFILE IMAGE</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.instruction}>
              Upload the learner's image. You can choose to do it from the gallery or take a new photo.
            </Text>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 2</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Representative's Name</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.representativeName}
              onChangeText={(text) => updateFormData('representativeName', text)}
              autoCapitalize="words"
            />
            <Text style={styles.instruction}>
              Enter the first name of the learner's representative.
            </Text>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 3</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Representative's Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Example: XXXX-XXX-XXXX"
              value={formData.representativePhone}
              onChangeText={(text) =>
                updateFormData('representativePhone', formatPhoneNumber(text))
              }
              keyboardType="phone-pad"
              maxLength={12}
            />
            <Text style={styles.instruction}>
              Enter the representative's phone number in the box below.
            </Text>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 4</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Learner's Name</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.learnerName}
              onChangeText={(text) => updateFormData('learnerName', text)}
              autoCapitalize="words"
            />
            <Text style={styles.instruction}>
              In this step, enter the name of the learner.
            </Text>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 5</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Select Grade</Text>
            <ScrollView style={styles.gradeList}>
              {grades.map((grade) => (
                <TouchableOpacity
                  key={grade}
                  style={[
                    styles.gradeOption,
                    formData.grade === grade && styles.gradeOptionSelected,
                  ]}
                  onPress={() => updateFormData('grade', grade)}
                >
                  <Text
                    style={[
                      styles.gradeOptionText,
                      formData.grade === grade && styles.gradeOptionTextSelected,
                    ]}
                  >
                    {grade}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.instruction}>
              Select the grade the learner is in. You can change this later if needed.
            </Text>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 6</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text.toLowerCase())}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.instruction}>
              Enter your email address. This will be used to log in to the app.
            </Text>
          </View>
        );

      case 7:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 7</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.instruction}>
              Enter a password. This will be the password we use to log in to the app. The password must be at least 6 characters.
            </Text>
          </View>
        );

      case 8:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 8</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>CONGRATULATIONS PHRASE</Text>
            <View style={styles.audioControls}>
              <TouchableOpacity style={styles.recordButton}>
                <Text style={styles.recordButtonText}>🔴 RECORD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>▶ LISTEN</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.instruction}>
              In steps 8 and 9, record your own voice. The congratulations phrase is what the learner will hear at the end of a lesson.
            </Text>
          </View>
        );

      case 9:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 9</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>LEARNER'S NAME</Text>
            <View style={styles.audioControls}>
              <TouchableOpacity style={styles.recordButton}>
                <Text style={styles.recordButtonText}>🔴 RECORD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>▶ LISTEN</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.instruction}>
              Say quietly and peacefully, pronounce the learner's name and the stop button will finish.
            </Text>
          </View>
        );

      case 10:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 10</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Parental Control Username</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.parentalUsername}
              onChangeText={(text) => updateFormData('parentalUsername', text)}
              autoCapitalize="none"
            />
            <Text style={styles.instruction}>
              Enter a username for parental controls. This will allow parents to share words with others in the app.
            </Text>
          </View>
        );

      case 11:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>STEP 11</Text>
            <Text style={styles.helpText}>Help?</Text>
            <Text style={styles.label}>Parental Control Password</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={formData.parentalPassword}
              onChangeText={(text) => updateFormData('parentalPassword', text)}
              secureTextEntry
              autoCapitalize="none"
            />
            <Text style={styles.instruction}>
              Enter a password for parental controls. This password will be used to share and receive words. Must be at least 6 characters.
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrevious} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>
            STEP {currentStep}
          </Text>
        </View>

        {renderStep()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Text style={styles.previousButtonText}>PREVIOUS</Text>
          </TouchableOpacity>

          {currentStep < 11 ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>FINISH</Text>
            </TouchableOpacity>
          )}
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
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.text,
  },
  stepIndicator: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  stepContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  helpText: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    color: theme.colors.primary,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  instruction: {
    fontSize: 12,
    color: theme.colors.darkGray,
    marginTop: theme.spacing.md,
    lineHeight: 18,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  profileImageIcon: {
    fontSize: 60,
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  gradeList: {
    maxHeight: 300,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.sm,
  },
  gradeOption: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  gradeOptionSelected: {
    backgroundColor: theme.colors.lightPeach,
  },
  gradeOptionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  gradeOptionTextSelected: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.md,
  },
  recordButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  recordButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  playButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  previousButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  previousButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#0066FF',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  finishButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
