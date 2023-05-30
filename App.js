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
import SplashScreen from "./src/screens/SplashScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import ConfirmationScreen from "./src/screens/ConfirmationScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import ProfileScreen from "./src/screens/settings/ProfileScreen";
import EditProfileScreen from "./src/screens/settings/EditProfileScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import EnterNewPasswordScreen from "./src/screens/EnterNewPasswordScreen";
import NotificationSettingsScreen from "./src/screens/settings/NotificationSettingsScreen";
import RemaindersSettings from "./src/screens/settings/RemaindersSettings";
import { AppProvider } from "./AppContext";
import Colors from "./src/constants/Colors";
import FAQScreen from './src/screens/settings/FAQScreen';


const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
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
      <AppProvider>
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
            options={({ navigation }) => ({
              title: "Brainy",
              headerBackTitle: null,
              headerRight: () => (
                <Ionicons
                  name="settings-outline"
                  size={24}
                  style={{ marginRight: 20, color: Colors.primary }}
                  onPress={() => navigation.navigate("SettingsScreen")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: "My Profile" }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{ title: "Edit profile" }}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ headerBackTitleVisible: false, title: "" }}
          />
          <Stack.Screen
            name="EnterNewPasswordScreen"
            component={EnterNewPasswordScreen}
            options={{ headerBackTitleVisible: false, title: "" }}
          />
          <Stack.Screen
            name="NotificationSettingsScreen"
            component={NotificationSettingsScreen}
            options={{title: "Notifications" }}
          />
          <Stack.Screen
            name="RemaindersSettings"
            component={RemaindersSettings}
            options={{
              
              title: "Daily Remainders",
            }}
          />
          <Stack.Screen
            name="FAQScreen"
            component={FAQScreen}
            options={{
              
              title: "Frequently asked questions",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </AppProvider>
    )
  );
};

export default App;
