import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { useUser } from '../state/UserContext';
import { DrawerMenu } from '../components/DrawerMenu';

const modules = [
  { id: 'Alphabet', title: 'Alphabet', image: require('../../content/assets/alfabeto_tamil.png') },
  { id: 'Sounds', title: 'Sounds', image: require('../../content/assets/sonidos_tamil.png') },
  { id: 'Mathematics', title: 'Mathematics', image: require('../../content/assets/numeros_tamil.png') },
  { id: 'Family', title: 'Family', image: require('../../content/assets/familia_tamil.png') },
  { id: 'Write', title: 'Write', image: require('../../content/assets/escribo_tamil.png') },
  { id: 'Read', title: 'I know how to read', image: require('../../content/assets/leer_tamil.png') },
  { id: 'Complete', title: 'Complete', image: require('../../content/assets/completar_tamil.png') },
  { id: 'Words', title: 'Words', image: require('../../content/assets/palabras_tamil.png') },
  { id: 'Festivals', title: 'Festivals', image: require('../../content/assets/figuras_tamil.png') },
  { id: 'Colors', title: 'Colors', image: require('../../content/assets/colores_tamil.png') }
];

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { isUnlocked } = useUser();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handlePress = (moduleId: string) => {
    if (isUnlocked(moduleId)) {
      navigation.navigate(moduleId as never);
    } else {
      Alert.alert('Locked', 'Please pass the previous quiz to unlock this module.');
    }
  };

  return (
    <View style={styles.screenContainer}>
      {/* Header with Menu Button */}
      <View style={styles.headerBar}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setDrawerVisible(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hello, Student</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>miABC Tamil</Text>
        <View style={styles.grid}>
          {modules.map((mod) => {
            const unlocked = isUnlocked(mod.id);
            return (
              <TouchableOpacity
                key={mod.id}
                style={[
                  styles.card,
                  !unlocked && styles.cardLocked
                ]}
                onPress={() => handlePress(mod.id)}
              >
                <Image 
                  source={mod.image} 
                  style={styles.cardImage}
                />
                <Text style={styles.cardText}>{mod.title}</Text>
                {!unlocked && <Text style={styles.lockIcon}>🔒</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <DrawerMenu 
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: theme.colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  headerRight: {
    width: 40,
  },
  container: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  header: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: theme.colors.card,
    padding: 0,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    minHeight: 160,
  },
  cardLocked: {
    opacity: 0.5,
    backgroundColor: '#E0E0E0',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardText: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: '100%',
  },
  lockIcon: {
    fontSize: 24,
    marginTop: 8,
  }
});
