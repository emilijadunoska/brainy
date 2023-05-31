import React, { useEffect } from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import AppTextInput from "../../components/AppTextInput";
import { auth } from "../../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("ChatScreen");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);       
      })

      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert(err.message);
        }
      });
  };

  const handleResetPassword = () => {
    navigation.navigate("ResetPasswordScreen");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#282534" },
      headerTintColor: "#282534",
    });
  }, [navigation]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.white} />
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subtitle}>Happy to see you again!</Text>
            <Text style={styles.subtitle}>Please login first.</Text>
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <Text style={styles.plainText}>
            Forgot your password?{" "}
            <Text style={styles.clickableText} onPress={handleResetPassword}>
              Click here
            </Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.plainText}>
            Don't have an account yet?{" "}
            <Text
              style={styles.clickableText}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Register
            </Text>
          </Text>
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
  titleContainer: {
    alignItems: "center",
    marginBottom: Spacing * 4,
  },
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontWeight: "bold",
    marginVertical: Spacing,
  },
  subtitle: {
    fontSize: FontSize.large,
    maxWidth: "80%",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: Spacing * 1,
  },
  forgotPasswordText: {
    color: Colors.black,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  button: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.1,
    shadowRadius: Spacing,
  },
  buttonText: {
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large,
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

export default Login;
