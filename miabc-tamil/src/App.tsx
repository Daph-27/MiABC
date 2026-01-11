import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './state/UserContext';
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'miABC Tamil' }} />
          <Stack.Screen name="Alphabet" component={AlphabetScreen} />
          <Stack.Screen name="Sounds" component={SoundsScreen} />
          <Stack.Screen name="Mathematics" component={MathematicsScreen} />
          <Stack.Screen name="Family" component={FamilyScreen} />
          <Stack.Screen name="Write" component={WriteScreen} />
          <Stack.Screen name="Read" component={ReadScreen} />
          <Stack.Screen name="Complete" component={CompleteScreen} />
          <Stack.Screen name="Words" component={WordsScreen} />
          <Stack.Screen name="Festivals" component={FestivalsScreen} />
          <Stack.Screen name="Colors" component={ColorsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
