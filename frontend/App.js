import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActivityIndicator, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { initDatabase } from './database/api';

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterStep0 from './screens/registration/RegisterStep0';
import RegisterStep1 from './screens/registration/RegisterStep1';
import RegisterStep2 from './screens/registration/RegisterStep2';
import RegisterStep3 from './screens/registration/RegisterStep3';
import RegisterStep4 from './screens/registration/RegisterStep4';
import RegisterStep6 from './screens/registration/RegisterStep6';
import RegisterStep7 from './screens/registration/RegisterStep7';
import RegisterStep8 from './screens/registration/RegisterStep8';
import RegisterStep9 from './screens/registration/RegisterStep9';
import RegisterStep10 from './screens/registration/RegisterStep10';
import RegisterStep11 from './screens/registration/RegisterStep11';
import RegisterStep12 from './screens/registration/RegisterStep12';
import DashboardScreen from './screens/DashboardScreen';
import AlfabetoScreen from './screens/categories/AlfabetoScreen';
import SonidosScreen from './screens/categories/SonidosScreen';
import PalabrasScreen from './screens/categories/PalabrasScreen';
import CompletarScreen from './screens/categories/CompletarScreen';
import FamiliaScreen from './screens/categories/FamiliaScreen';
import ColoresScreen from './screens/categories/ColoresScreen';
import NumerosScreen from './screens/categories/NumerosScreen';
import FigurasScreen from './screens/categories/FigurasScreen';
import YaSeLeerScreen from './screens/categories/YaSeLeerScreen';
import ConfiguracionScreen from './screens/ConfiguracionScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Back button component for header
const BackButton = ({ navigation }) => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.navigate('Dashboard')}
  >
    <Text style={styles.backButtonText}>←</Text>
  </TouchableOpacity>
);

// Screen options with back button (for non-Dashboard screens)
const getScreenOptionsWithBack = (title) => ({ navigation }) => ({
  title,
  headerLeft: () => <BackButton navigation={navigation} />,
});

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FF6B6B',
        },
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#FFE0E0',
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Drawer.Screen name="Alfabeto" component={AlfabetoScreen} options={getScreenOptionsWithBack('Alphabet')} />
      <Drawer.Screen name="Sonidos" component={SonidosScreen} options={getScreenOptionsWithBack('Sounds')} />
      <Drawer.Screen name="Palabras" component={PalabrasScreen} options={getScreenOptionsWithBack('Words')} />
      <Drawer.Screen name="Completar" component={CompletarScreen} options={getScreenOptionsWithBack('Complete')} />
      <Drawer.Screen name="Familia" component={FamiliaScreen} options={getScreenOptionsWithBack('Family')} />
      <Drawer.Screen name="Colores" component={ColoresScreen} options={getScreenOptionsWithBack('Colors')} />
      <Drawer.Screen name="Numeros" component={NumerosScreen} options={getScreenOptionsWithBack('Numbers')} />
      <Drawer.Screen name="Figuras" component={FigurasScreen} options={getScreenOptionsWithBack('Geometric Figures')} />
      <Drawer.Screen name="YaSeLeer" component={YaSeLeerScreen} options={getScreenOptionsWithBack('I Can Read')} />
      <Drawer.Screen name="Configuracion" component={ConfiguracionScreen} options={getScreenOptionsWithBack('Settings')} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 15,
    padding: 5,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        setDbReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Database initialization error:', error);
        setIsLoading(false);
      }
    };

    setupDatabase();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterStep0" component={RegisterStep0} />
        <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
        <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
        <Stack.Screen name="RegisterStep3" component={RegisterStep3} />
        <Stack.Screen name="RegisterStep4" component={RegisterStep4} />
        <Stack.Screen name="RegisterStep6" component={RegisterStep6} />
        <Stack.Screen name="RegisterStep7" component={RegisterStep7} />
        <Stack.Screen name="RegisterStep8" component={RegisterStep8} />
        <Stack.Screen name="RegisterStep9" component={RegisterStep9} />
        <Stack.Screen name="RegisterStep10" component={RegisterStep10} />
        <Stack.Screen name="RegisterStep11" component={RegisterStep11} />
        <Stack.Screen name="RegisterStep12" component={RegisterStep12} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
