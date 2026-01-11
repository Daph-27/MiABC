import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './state/UserContext';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AlphabetScreen } from './screens/AlphabetScreen';
import { SoundsScreen } from './screens/SoundsScreen';
import { MathematicsScreen } from './screens/MathematicsScreen';
import { FamilyScreen } from './screens/FamilyScreen';
import { WriteScreen } from './screens/WriteScreen';
import { ReadScreen } from './screens/ReadScreen';
import { CompleteScreen } from './screens/CompleteScreen';
import { WordsScreen } from './screens/WordsScreen';
import { FestivalsScreen } from './screens/FestivalsScreen';
import { ColorsScreen } from './screens/ColorsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              headerShown: true,
              title: 'miABC Tamil' 
            }} 
          />
          <Stack.Screen 
            name="Alphabet" 
            component={AlphabetScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Sounds" 
            component={SoundsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Mathematics" 
            component={MathematicsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Family" 
            component={FamilyScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Write" 
            component={WriteScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Read" 
            component={ReadScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Complete" 
            component={CompleteScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Words" 
            component={WordsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Festivals" 
            component={FestivalsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="Colors" 
            component={ColorsScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
