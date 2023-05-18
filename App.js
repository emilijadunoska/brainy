import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/ChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
  }
  fetchData();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerBackTitleVisible: false, title: ' '}}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen}options={{headerBackTitleVisible: false, title: ' '}} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerBackTitleVisible: false, title: 'Brainy'}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;