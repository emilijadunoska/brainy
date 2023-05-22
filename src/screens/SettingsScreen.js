import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const SettingsScreen = ({ navigation }) => {
  const appVersion = Constants.manifest.version;

  const handleProfileSettings = () => {
    // Code to navigate to User Profile Settings screen
  };

  const handleNotifications = () => {
    // Code to navigate to Notifications screen
  };

  const handleHelpAndSupport = () => {
    // Code to navigate to Help and Support screen
  };

  const handleAboutAndLegal = () => {
    // Code to navigate to About and Legal screen
  };
  const handleLogout = () => {
    // Code to handle logout functionality
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleProfileSettings}>
        <Ionicons name="person-circle-outline" size={24} color="#282534" />
        <Text style={styles.optionText}>Profile Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleNotifications}>
        <Ionicons name="notifications-outline" size={24} color="#282534" />
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleHelpAndSupport}>
        <Ionicons name="help-circle-outline" size={24} color="#282534" />
        <Text style={styles.optionText}>Help and Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleAboutAndLegal}>
        <Ionicons name="information-circle-outline" size={24} color="#282534" />
        <Text style={styles.optionText}>About and Legal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#282534" />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.versionContainer}>
        <Text style={styles.appVersion}>App Version: {appVersion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingVertical: 14,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333333",
  },
  versionContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 16,
  },
  appVersion: {
    fontSize: 14,
    color: "#999999",
  },
});

export default SettingsScreen;
