import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function FamiliaScreen() { return ( <View style={styles.container}><Text style={styles.title}>Family</Text><Text style={styles.description}>Family Members</Text></View> ); }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 }, title: { fontSize: 28, fontWeight: 'bold', color: '#E91E63', marginBottom: 10 }, description: { fontSize: 18, color: '#666' } });
