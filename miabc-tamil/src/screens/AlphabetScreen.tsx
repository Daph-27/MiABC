import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { QuizModal } from '../components/QuizModal';

interface AlphabetItem {
  id: string;
  category: string;
  character: string;
  transliteration: string;
  pronunciation: string;
  example: string;
  audioFile: string;
}

const DUMMY_QUIZ_DATA = {
  moduleId: 'Alphabet',
  passingScore: 80,
  questions: [
    {
      id: 'q1',
      text: 'Which of these is the first letter of the Tamil alphabet?',
      options: [
        { id: 'o1', text: 'அ (A)', isCorrect: true },
        { id: 'o2', text: 'க (Ka)', isCorrect: false },
        { id: 'o3', text: 'ச (Sa)', isCorrect: false },
      ]
    },
    {
      id: 'q2',
      text: 'How many vowels are in Tamil?',
      options: [
        { id: 'o1', text: '5', isCorrect: false },
        { id: 'o2', text: '12', isCorrect: true },
        { id: 'o3', text: '21', isCorrect: false },
      ]
    }
  ]
};

export const AlphabetScreen = () => {
  const [quizVisible, setQuizVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'Vowels' | 'Consonants'>('Consonants');
  const [alphabetData, setAlphabetData] = useState<AlphabetItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = require('../../content/modules/01_alphabet.json');
        setAlphabetData(data.items);
      } catch (error) {
        console.error('Error loading alphabet data:', error);
      }
    };
    loadData();
  }, []);

  const filteredItems = alphabetData.filter(item => item.category === selectedTab);

  const playAudio = (audioFile: string) => {
    console.log('Playing audio:', audioFile);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playAllButton}>
        <Text style={styles.playAllText}>Sort Alphabet ▶</Text>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'Vowels' && styles.tabActive]}
          onPress={() => setSelectedTab('Vowels')}
        >
          <Text style={[styles.tabText, selectedTab === 'Vowels' && styles.tabTextActive]}>
            Alphabet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'Consonants' && styles.tabActive]}
          onPress={() => setSelectedTab('Consonants')}
        >
          <Text style={[styles.tabText, selectedTab === 'Consonants' && styles.tabTextActive]}>
            Consonants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'Vowels' && styles.tabActive]}
          onPress={() => setSelectedTab('Vowels')}
        >
          <Text style={[styles.tabText, selectedTab === 'Vowels' && styles.tabTextActive]}>
            Vowels
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.gridContainer}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.letterCard}>
            <Text style={styles.letterCharacter}>{item.character}</Text>
            <Text style={styles.letterTransliteration}>{item.transliteration}</Text>
            <View style={styles.exampleContainer}>
              <View style={styles.exampleImagePlaceholder}>
                <Text style={styles.exampleEmoji}>📝</Text>
              </View>
              <Text style={styles.exampleWord}>{item.example.split('(')[0].trim()}</Text>
            </View>
            
            <View style={styles.audioButtons}>
              <TouchableOpacity 
                style={styles.audioButton}
                onPress={() => playAudio(item.audioFile)}
              >
                <Text style={styles.audioIcon}>🔊</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.audioButton, styles.audioButtonSecondary]}
                onPress={() => playAudio(item.audioFile)}
              >
                <Text style={styles.audioIcon}>🔊</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => setQuizVisible(true)}
      >
        <Text style={styles.quizButtonText}>Take Module Quiz</Text>
      </TouchableOpacity>

      <QuizModal
        visible={quizVisible}
        quizData={DUMMY_QUIZ_DATA}
        onClose={() => setQuizVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  playAllButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playAllText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.darkGray,
  },
  tabTextActive: {
    color: theme.colors.white,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  letterCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  letterCharacter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  letterTransliteration: {
    fontSize: 20,
    color: theme.colors.darkGray,
    marginBottom: theme.spacing.md,
  },
  exampleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  exampleImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  exampleEmoji: {
    fontSize: 30,
  },
  exampleWord: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
  audioButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  audioButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButtonSecondary: {
    backgroundColor: '#4A90E2',
  },
  audioIcon: {
    fontSize: 20,
  },
  quizButton: {
    backgroundColor: theme.colors.success,
    margin: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  quizButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
