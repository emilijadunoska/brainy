import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import AppTextInput from "../../components/AppTextInput";
import { auth, database } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
const { width, height } = Dimensions.get("window");

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

// Handle the registration action
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!name || !email || !password) {
      alert("Please fill out all inputs.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const email = user.email;
        const uid = user.uid;
        db = getDatabase();
        set(ref(db, "users/" + uid), {
          name: name,
          email: email,
          password: password,
        });
        navigation.navigate("NotificationsScreen");
      })
      .then((data) => {
        //success callback
        console.log("data ", data);
      })
      .catch((err) => {
        let errorMessage = "An error occurred. Please try again.";
        switch (err.code) {
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "The email address is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is invalid.";
            break;
          default:
            break;
        }
        Alert.alert("Error", errorMessage);
      });
  };

  React.useLayoutEffect(() => {
    // Use layout effect to set navigation options
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" }, // Set header title color
      headerTintColor: "#282534", // Set header tint color
    });
  }, [navigation]);
  
  const dismissKeyboard = () => {
    // Function to dismiss the keyboard
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} />
        <View style={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Create an account</Text>
            <Text style={styles.subheadingText}>
              Let's start our journey together!
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <AppTextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.haveAccountContainer}>
            <Text style={styles.plainText}>
              Already have an account?{" "}
              <Text
                style={styles.clickableText}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                Log in
              </Text>
            </Text>
          </View>
          <Text style={styles.privacyText}>
            By signing up, you agree to our{" "}
            <Text style={styles.privacyLink}>Privacy Policy</Text> and{" "}
            <Text style={styles.privacyLink}>Terms and Conditions</Text>.
          </Text>
          <View style={styles.spacing} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    padding: Spacing * 2,
  },
  headingContainer: {
    alignItems: "center",
  },
  headingText: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontWeight: "bold",
    marginVertical: Spacing / 2,
  },
  subheadingText: {
    fontSize: FontSize.small,
    maxWidth: "80%",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: Spacing * 2,
  },
  registerButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing / 2,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.1,
    shadowRadius: Spacing,
  },
  registerButtonText: {
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large,
  },
  haveAccountContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing,
  },
  privacyText: {
    color: Colors.black,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  privacyLink: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  plainText: {
    color: Colors.black,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  clickableText: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});

export default Register;
