import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import LoginScreen from "./LoginScreen";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const { width, height } = Dimensions.get("window");


const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{ height: height / 2 }}
          resizeMode="contain"
          source={require("../images/image-bckg.png")}
        ></ImageBackground>
        <View
          style={{ paddingHorizontal: Spacing * 4, paddingTop: Spacing * 4 }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Start chatting with Brainy!{" "}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
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
              shadowOpacity: 0.1
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.onPrimary, fontSize: FontSize.large, textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
            }}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={{ fontWeight: "bold", color: Colors.primary, fontSize: FontSize.large, textAlign: 'center' }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
