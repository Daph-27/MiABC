import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ConfiguracionScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings / Configuración</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Data</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>Rossi</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>usuario@example.com</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Grade:</Text>
          <Text style={styles.value}>Third</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Backup</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>⬆️ SAVE DATA TO ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonText}>⬇️ DOWNLOAD DATA</Text>
        </TouchableOpacity>
        <Text style={styles.warning}>
          This step is very useful when you want to open the app on a new device.
          We recommend uploading data every time you add new words.
        </Text>
        <Text style={styles.disclaimer}>
          MiABC is not responsible for data on your device that was not uploaded to the cloud.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Settings</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text>Español 🇪🇸</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Text>English 🇺🇸</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <Text>தமிழ் 🇮🇳</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#FF6B6B', padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  section: { backgroundColor: '#FFF', padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  infoCard: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  label: { fontSize: 16, fontWeight: 'bold', width: 100, color: '#666' },
  value: { fontSize: 16, color: '#333' },
  button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  buttonSecondary: { backgroundColor: '#2196F3' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  warning: { fontSize: 13, color: '#666', marginTop: 15, lineHeight: 20 },
  disclaimer: { fontSize: 12, color: '#F44336', marginTop: 10, fontStyle: 'italic' },
  languageButton: { padding: 15, backgroundColor: '#F5F5F5', borderRadius: 8, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
});
