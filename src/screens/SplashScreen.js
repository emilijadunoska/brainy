import { View, StyleSheet, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";

const SplashScreen = (props) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 6000);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace("OnboardingScreen");
    }
  }, [authLoaded, props.navigation]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../images/brainylogo.gif")}
        style={[styles.splash, { opacity: fadeAnim }]}
      />
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
          brainy
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  contentContainer: {
    alignItems: "center",
  },
  splash: {
    width: 150,
    height: 150,
  },
  textContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  appName: {
    color: "#282828",
    fontSize: 30,
    fontWeight: "bold",
  },
  slogan: {
    fontSize: 16,
    color: "#999999",
    marginTop: 10,
  },
});

export default SplashScreen;
