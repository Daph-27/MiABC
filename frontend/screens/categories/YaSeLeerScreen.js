import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function YaSeLeerScreen() { return ( <View style={styles.container}><Text style={styles.title}>I Can Read</Text><Text style={styles.description}>Reading practice</Text></View> ); }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 }, title: { fontSize: 28, fontWeight: 'bold', color: '#FF6B6B', marginBottom: 10 }, description: { fontSize: 18, color: '#666' } });
