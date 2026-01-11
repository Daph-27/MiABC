import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { useUser } from '../state/UserContext';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const { userData, logout } = useUser();

  const menuItems = [
    { id: 'Sounds', title: 'Sounds', icon: '🔊' },
    { id: 'Words', title: 'Words', icon: '📝' },
    { id: 'Complete', title: 'Complete', icon: '✏️' },
    { id: 'Family', title: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'Colors', title: 'Colors', icon: '🎨' },
    { id: 'Mathematics', title: 'Numbers', icon: '🔢' },
    { id: 'Festivals', title: 'Figures', icon: '📐' },
    { id: 'Write', title: 'Writing', icon: '✍️' },
    { id: 'Read', title: 'Reading', icon: '📖' },
  ];

  const handleMenuItemPress = (itemId: string) => {
    onClose();
    navigation.navigate(itemId as never);
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigation.navigate('Login' as never);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.drawerContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header with Profile */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.profileImageContainer}>
                <Text style={styles.profileIcon}>👤</Text>
              </View>
              <Text style={styles.greeting}>Hello, {userData?.learnerName || 'Student'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <ScrollView style={styles.menuScrollView}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.id)}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}

            {/* Settings */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                // Navigate to settings when available
              }}
            >
              <Text style={styles.menuIcon}>⚙️</Text>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Text style={styles.menuIcon}>🚪</Text>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    width: '75%',
    backgroundColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#546E7A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  profileIcon: {
    fontSize: 50,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: theme.spacing.lg,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: theme.colors.white,
  },
  menuScrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: theme.colors.primary,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
    width: 30,
  },
  menuText: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: '500',
  },
  logoutItem: {
    marginTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
});
