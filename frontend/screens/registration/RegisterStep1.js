import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterStep1({ navigation, route }) {
  const [profileImage, setProfileImage] = useState(null);
  const { accessCode } = route.params;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (!profileImage) {
      Alert.alert('Attention', 'Please select a photo');
      return;
    }
    navigation.navigate('RegisterStep2', { accessCode, profileImage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Profile Picture</Text>
        
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.placeholderText}>👤</Text>
          </View>
        )}

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>GALLERY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
          <Text style={styles.imageButtonText}>TAKE PHOTO</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  step: { color: '#FF6B6B', fontSize: 18, fontWeight: 'bold', padding: 20 },
  content: { flex: 1, padding: 20, alignItems: 'center' },
  label: { fontSize: 16, marginBottom: 20 },
  profileImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  profilePlaceholder: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  placeholderText: { fontSize: 60 },
  imageButton: { backgroundColor: '#FF6B6B', padding: 12, borderRadius: 5, width: 200, alignItems: 'center', marginBottom: 10 },
  imageButtonText: { color: '#FFF', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', width: '100%' },
  buttonCancel: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonNext: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});