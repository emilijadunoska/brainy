import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, Button, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ChatScreen from './src/screens/ChatScreen';
import SplashScreen from './src/screens/SplashScreen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Set the date and time for the notification
  const trigger = new Date(); // Use the current date and time
  trigger.setHours(5); // Set the hour (in 24-hour format)
  trigger.setMinutes(30); // Set the minute
  trigger.setSeconds(0); // Set the second

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerBackTitleVisible: false, title: ' '}}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerBackTitleVisible: false, title: ' '}} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerBackTitleVisible: false, title: 'Brainy'}} />
        </Stack.Navigator>
        <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      </NavigationContainer>
    )
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Brainy time! 📬",
      body: 'How do you feel today',
      data: { data: 'random' },
    },
    trigger: { hour: trigger.getHours(),
      minute: trigger.getMinutes(),
      repeats: true, // Repeat the notification daily at the specified time },
    },
});
}

export default App;