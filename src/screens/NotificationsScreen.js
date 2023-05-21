import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";



const NotificationsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleEnableNotifications = () => {
    navigation.navigate('ChatScreen')
  };

  const handleNotNow = () => {
    // Code to handle "Not Now" button press
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Before you start</Text>
        <Text style={styles.subHeading}>
          Enable push notifications to get reminders to check in with Brainy.
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <Image
          source={require("../../assets/pushNotifications.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEnableNotifications}
        >
          <Text style={styles.buttonText}>ENABLE NOTIFICATIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotNow}>
          <Text style={styles.nextText}>Not now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  subHeading: {
    color: Colors.darkGrey,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10, 
    marginTop: 15,
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 20,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    padding: Spacing,
    borderRadius: 20,
    width: "80%"
  },
  buttonText: {
    color: Colors.primary ,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  nextText: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 15
  },
});


export default NotificationsScreen;