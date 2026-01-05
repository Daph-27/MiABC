import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const categories = [
    { name: 'ALPHABET', subtitle: 'Alfabeto', color: '#4CAF50', route: 'Alfabeto' },
    { name: 'SOUNDS', subtitle: 'Sonidos', color: '#2196F3', route: 'Sonidos' },
    { name: 'WORDS', subtitle: 'Palabras', color: '#FF9800', route: 'Palabras' },
    { name: 'COMPLETE', subtitle: 'Completar', color: '#9C27B0', route: 'Completar' },
    { name: 'FAMILY', subtitle: 'Familia', color: '#E91E63', route: 'Familia' },
    { name: 'COLORS', subtitle: 'Colores', color: '#00BCD4', route: 'Colores' },
    { name: 'NUMBERS', subtitle: 'Números', color: '#FF5722', route: 'Numeros' },
    { name: 'FIGURES', subtitle: 'Figuras', color: '#8BC34A', route: 'Figuras' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Rossi</Text>
      </View>

      <ScrollView style={styles.categoryGrid} contentContainerStyle={styles.gridContent}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryCard, { backgroundColor: category.color }]}
            onPress={() => navigation.navigate(category.route)}
          >
            <View style={styles.categoryContent}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  categoryGrid: {
    flex: 1,
  },
  gridContent: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
});
