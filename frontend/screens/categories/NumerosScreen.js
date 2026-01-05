import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function NumerosScreen() { return ( <View style={styles.container}><Text style={styles.title}>Numbers</Text><Text style={styles.description}>0 to 100</Text></View> ); }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 }, title: { fontSize: 28, fontWeight: 'bold', color: '#FF5722', marginBottom: 10 }, description: { fontSize: 18, color: '#666' } });
