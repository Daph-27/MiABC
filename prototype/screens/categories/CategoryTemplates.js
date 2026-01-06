// Simple category screen templates
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SonidosScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Sonidos / Sounds</Text>
    <Text style={styles.description}>Simples y Compuestos</Text>
  </View>
);

export const CompletarScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Completar / Complete</Text>
    <Text style={styles.description}>Juegos de completar palabras</Text>
  </View>
);

export const FamiliaScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Familia / Family</Text>
    <Text style={styles.description}>Miembros de la familia</Text>
  </View>
);

export const ColoresScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Colores / Colors</Text>
    <Text style={styles.description}>Aprende los colores</Text>
  </View>
);

export const NumerosScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Números / Numbers</Text>
    <Text style={styles.description}>0 a 100</Text>
  </View>
);

export const FigurasScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Figuras Geométricas</Text>
    <Text style={styles.description}>Geometric Figures</Text>
  </View>
);

export const YaSeLeerScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Ya Se Leer</Text>
    <Text style={styles.description}>I Can Read</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FF6B6B', marginBottom: 10 },
  description: { fontSize: 18, color: '#666' },
});
