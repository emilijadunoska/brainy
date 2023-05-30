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

import ProfileScreen from "./ProfileScreen";

import { auth, database } from "../../../firebase";
import Colors from "../../constants/Colors";

const SettingsScreen = ({ navigation }) => {
  const appVersion = Constants.manifest.version;

  const handleProfileSettings = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleNotifications = () => {
    navigation.navigate("NotificationSettingsScreen");
  };

  const handleHelpAndSupport = () => {
    // Code to navigate to Help and Support screen
  };

  const handleAboutAndLegal = () => {
    // Code to navigate to About and Legal screen
  };
  const handleLogout = () => {
    const user = auth.currentUser;

    if (user) {
      auth
        .signOut()
        .then(() => {
          console.log("User signed out!");
          navigation.navigate("WelcomeScreen");
        })
        .catch((error) => {
          console.log("Sign out error", error);
        });
    } else {
      console.log("No user is signed in.");
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.blankSpace} />
      <TouchableOpacity style={styles.option} onPress={handleProfileSettings}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color="#282534"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Profile Settings</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#282534" style={styles.optionArrow} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleNotifications}>
        <View style={styles.optionLeft}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#282534"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Notifications</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#282534" style={styles.optionArrow}/>
      </TouchableOpacity>
      <View style={styles.blankSpace} />
      <View style={styles.blankSpace} />

      <TouchableOpacity style={styles.option} onPress={handleHelpAndSupport}>
      <View style={styles.optionLeft}>
        <Ionicons
          name="help-circle-outline"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Help and Support</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#282534" style={styles.optionArrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleAboutAndLegal}>
      <View style={styles.optionLeft}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>About and Legal</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#282534" style={styles.optionArrow} />
      </TouchableOpacity>
      <View style={styles.blankSpace} />
      <View style={styles.blankSpace} />
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
      <View style={styles.optionLeft}>
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Logout</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#282534" style={styles.optionArrow} />
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
    paddingVertical: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA", 
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
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
  blankSpace: {
    height: 20, 
  },
  optionIcon: {
    marginLeft: 20, 
  },
  optionArrow: {
    marginRight: 15, 
    color: Colors.darkGrey,
  },
});

export default SettingsScreen;
