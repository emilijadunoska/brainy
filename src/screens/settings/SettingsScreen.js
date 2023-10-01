import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { getDatabase, ref, remove } from "firebase/database";
import { auth } from "../../../firebase";
import Colors from "../../constants/Colors";

// Define the SettingsScreen component
const SettingsScreen = ({ navigation }) => {
  const appVersion = Constants.manifest.version;
  
// Handle the navigation to the ProfileScreen
  const handleProfileSettings = () => {
    navigation.navigate("ProfileScreen");
  };

// Handle the navigation to the NotificationSettingsScreen
  const handleNotifications = () => {
    navigation.navigate("NotificationSettingsScreen");
  };

 // Handle the navigation to the FAQScreen
  const handleFAQ = () => {
    navigation.navigate("FAQScreen");
  };

 // Open the privacy policy URL in the browser
  const handlePrivacyPolicy = () => {
    Linking.openURL(
      "https://www.termsfeed.com/live/2b9d0068-fceb-4695-9556-e8bd2d148655"
    );
  };

// Open the terms and conditions URL in the browser
  const handleTermsAndConditions = () => {
    Linking.openURL(
      "https://www.termsfeed.com/live/cbb3653b-d517-4b31-b790-9f43a3436033"
    );
  };

// Handle the user logout
  const handleLogout = () => {
    const user = auth.currentUser;

    if (user) {
      console.log(user.toString()); 
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

// Handle the user account deletion
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: handleConfirmation, 
        },
      ],
      { cancelable: true }
    );
  };

// Handle the confirmation for account deletion
  const handleConfirmation = () => {
    const user = auth.currentUser;
    if (user) {
      
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
  
      // Delete the user data from the Realtime Database
      remove(userRef)
        .then(() => {
          console.log("User data deleted from Realtime Database!");
  
          // Delete the user account
          user.delete()
            .then(() => {
              console.log("User account deleted!");
              if (navigation) {
                navigation.navigate("WelcomeScreen");
              } else {
                console.log("navigation is undefined.");
              }
            })
            .catch((error) => {
              console.log("Delete account error", error);
            });
        })
        .catch((error) => {
          console.log("Delete data error", error);
        });
    } else {
      console.log("No user is signed in.");
    }
  };

// Set up the navigation options
React.useLayoutEffect(() => {
  navigation.setOptions({
    headerTitleStyle: { color: "#282534" },
    headerTintColor: "#282534",
    headerBackTitle: "Back",
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
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
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
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
    </TouchableOpacity>

    <View style={styles.blankSpace} />
    <View style={styles.blankSpace} />

    <TouchableOpacity style={styles.option} onPress={handleFAQ}>
      <View style={styles.optionLeft}>
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>FAQ</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.option} onPress={handlePrivacyPolicy}>
      <View style={styles.optionLeft}>
        <Ionicons
          name="lock-closed"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Privacy Policy</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.option}
      onPress={handleTermsAndConditions}
    >
      <View style={styles.optionLeft}>
        <Ionicons
          name="document-text-outline"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Terms & Conditions</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
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
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
      <View style={styles.optionLeft}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="#282534"
          style={styles.optionIcon}
        />
        <Text style={styles.optionText}>Delete account</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#282534"
        style={styles.optionArrow}
      />
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
