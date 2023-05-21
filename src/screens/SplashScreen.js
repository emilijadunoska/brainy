import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Typewriter from "react-native-typewriter";
import Colors from "../constants/Colors";

const SplashScreen = (props) => {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace("OnboardingScreen");
    }
  }, [authLoaded, props.navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.splash} />
      <View style={styles.textContainer}>
        <Typewriter style={styles.appName} typing={1} maxDelay={300}>
          <Text>Brainy</Text>
        </Typewriter>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  splash: {
    width: 250,
    height: 250,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  appName: {
    color: Colors.primary,
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10, 
  },
});

export default SplashScreen;
