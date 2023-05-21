import "react-native-gesture-handler";
import { Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ChatScreen from "./src/screens/ChatScreen";
import { schedulePushNotification } from "./BackgroundNotification";
import SplashScreen from "./src/screens/SplashScreen";
import * as Notifications from "expo-notifications";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import ConfirmationScreen from "./src/screens/ConfirmationScreen";

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

  React.useEffect(() => {
    schedulePushNotification();
    async function fetchData() {
      const appData = await AsyncStorage.getItem("isAppFirstLaunched");
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem("isAppFirstLaunched", "true");
      } else {
        setIsAppFirstLaunched(true);
      }
    }
    fetchData();
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
            transitionSpec: {
              open: {
                animation: "timing",
                config: {
                  duration: 500, // Increase the duration for a slower animation
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 500, // Increase the duration for a slower animation
                },
              },
            },
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
              options={{ headerShown: false, title: " " }}
            />
          )}
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false, title: " " }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerBackTitleVisible: false, title: " " }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerBackTitleVisible: false, title: " " }}
          />
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
            options={{ headerBackTitleVisible: false, title: " " }}
          />
            <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
            options={{ headerShown: false, title: " " }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerBackTitleVisible: false, title: "Brainy" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
