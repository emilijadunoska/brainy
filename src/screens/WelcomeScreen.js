import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const { width, height } = Dimensions.get("window");


const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="contain"
          source={require("../images/image-bckg.png")}
        ></ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          Start chatting with Brainy!
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundContainer: {
    flex: 1,
    marginTop: Spacing * 2,

  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing * 3,
    paddingTop: Spacing * 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: FontSize.xxLarge,
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Spacing * 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing * 10,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: "48%",
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.1,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: "48%",
    borderRadius: Spacing,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: FontSize.large,
    textAlign: "center",
    color: Colors.onPrimary,
  },
});

export default WelcomeScreen;
