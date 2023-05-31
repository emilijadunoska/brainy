import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";


const EnterNewPassword = ({navigation}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleNewPassword = () => {
    console.log("Password changed! ");
    navigation.navigate('LoginScreen');

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontWeight: "bold",
              marginVertical: Spacing * 3,
            }}
          >
            Enter new password
          </Text>
          <Text
            style={{
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Please enter your new password.
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
          <AppTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          ></AppTextInput>
          <AppTextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
          ></AppTextInput>
        </View>

        <TouchableOpacity
          onPress={handleNewPassword}
          style={{
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
          }}
        >
          <Text
            style={{
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary, // Adjust the color to your preference
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colors.primary, // Adjust the color to your preference
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  accBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary, // Adjust the color to your preference
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default EnterNewPassword;
