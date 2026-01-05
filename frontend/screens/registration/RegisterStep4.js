import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function RegisterStep4({ navigation, route }) {
  const [learnerName, setLearnerName] = useState('');
  const [grade, setGrade] = useState('Preescolar');
  const params = route.params;
  const grades = ['Preschool', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];

  return (
    <View style={styles.container}>
      <Text style={styles.step}>STEP : 4</Text>
      <View style={styles.content}>
        <Text style={styles.instruction}>In this step, enter the learner's name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Learner's name" 
          value={learnerName} 
          onChangeText={setLearnerName} 
        />
        <Text style={styles.label}>Select the grade:</Text>
        <ScrollView style={styles.gradeList}>
          {grades.map((g) => (
            <TouchableOpacity 
              key={g} 
              style={[styles.gradeItem, grade === g && styles.gradeItemSelected]}
              onPress={() => setGrade(g)}
            >
              <Text style={[styles.gradeText, grade === g && styles.gradeTextSelected]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStep6', { ...params, learnerName, grade })}>
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
  content: { flex: 1, padding: 20 },
  instruction: { fontSize: 14, color: '#666', marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 12, marginBottom: 20 },
  gradeList: { maxHeight: 200, marginBottom: 20 },
  gradeItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  gradeItemSelected: { backgroundColor: '#FF6B6B' },
  gradeText: { fontSize: 14 },
  gradeTextSelected: { color: '#FFF', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
