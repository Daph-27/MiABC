import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
      <Drawer.Screen name="Alfabeto" component={AlfabetoScreen} options={{ title: 'Alphabet' }} />
      <Drawer.Screen name="Sonidos" component={SonidosScreen} options={{ title: 'Sounds' }} />
      <Drawer.Screen name="Palabras" component={PalabrasScreen} options={{ title: 'Words' }} />
      <Drawer.Screen name="Completar" component={CompletarScreen} options={{ title: 'Complete' }} />
      <Drawer.Screen name="Familia" component={FamiliaScreen} options={{ title: 'Family' }} />
      <Drawer.Screen name="Colores" component={ColoresScreen} options={{ title: 'Colors' }} />
      <Drawer.Screen name="Numeros" component={NumerosScreen} options={{ title: 'Numbers' }} />
      <Drawer.Screen name="Figuras" component={FigurasScreen} options={{ title: 'Geometric Figures' }} />
      <Drawer.Screen name="YaSeLeer" component={YaSeLeerScreen} options={{ title: 'I Can Read' }} />
      <Drawer.Screen name="Configuracion" component={ConfiguracionScreen} options={{ title: 'Settings' }} />
    </Drawer.Navigator>
  );
}

export default function App() {
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
