import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function FigurasScreen() { return ( <View style={styles.container}><Text style={styles.title}>Geometric Figures</Text><Text style={styles.description}>Learn shapes</Text></View> ); }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 }, title: { fontSize: 28, fontWeight: 'bold', color: '#8BC34A', marginBottom: 10 }, description: { fontSize: 18, color: '#666' } });
