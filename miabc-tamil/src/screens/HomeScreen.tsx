import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { useUser } from '../state/UserContext';

const modules = [
  { id: 'Alphabet', title: 'Alphabet' },
  { id: 'Sounds', title: 'Sounds' },
  { id: 'Mathematics', title: 'Mathematics' },
  { id: 'Family', title: 'Family' },
  { id: 'Write', title: 'Write' },
  { id: 'Read', title: 'I know how to read' },
  { id: 'Complete', title: 'Complete' },
  { id: 'Words', title: 'Words' },
  { id: 'Festivals', title: 'Festivals' },
  { id: 'Colors', title: 'Colors' }
];

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { isUnlocked } = useUser();

  const handlePress = (moduleId: string) => {
    if (isUnlocked(moduleId)) {
      navigation.navigate(moduleId as never);
    } else {
      Alert.alert('Locked', 'Please pass the previous quiz to unlock this module.');
    }
  };

  return (
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
              <Text style={styles.cardText}>{mod.title}</Text>
              {!unlocked && <Text style={styles.lockIcon}>🔒</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
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
    padding: theme.spacing.lg,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLocked: {
    opacity: 0.5,
    backgroundColor: '#E0E0E0',
  },
  cardText: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontSize: 18,
    textAlign: 'center',
  },
  lockIcon: {
    fontSize: 24,
    marginTop: 8,
  }
});
