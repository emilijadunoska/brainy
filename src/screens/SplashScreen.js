import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Lottie from 'lottie-react-native';
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";


const SplashScreen = (props) => {
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setAuthLoaded(true);
        }, 5000);
      }, []);

      useEffect(() => {
        if (authLoaded){
            props.navigation.replace('WelcomeScreen')
        }
      }, [authLoaded, props.navigation]);


  return (
    <View style={styles.container}>
        <Lottie source={require('../../assets/logo-original.json')} autoPlay loop style={styles.splash} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    width: 250, 
    height: 250,
  },
  image: {
    width: 200, 
    height: 200, 
    marginTop: 2,
  },
});

export default SplashScreen;
