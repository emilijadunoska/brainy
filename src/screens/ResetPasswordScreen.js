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
import { auth, database } from "../../firebase";

const ResetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //The handleResetPassword function is called when the user clicks on the reset password button. 
  //It uses Firebase's sendPasswordResetEmail method to send a password reset email to the provided email address.
  const handleResetPassword = () => {
    auth.sendPasswordResetEmail(email)
    .then(function() {
      console.log("Reset password email successfully sent to:", email);
      setMessage("Reset password email sent!");
      navigation.navigate('LoginScreen');
    })
    .catch(function(error) {
      console.log("Error in sending password reset email:", error);
      setMessage("Error: " + error.message);
    });
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
            Reset password
          </Text>
          <Text
            style={{
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Please enter your email address and we will send you a link to reset your password.
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></AppTextInput>
        </View>

        <TouchableOpacity
          onPress={handleResetPassword}
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
            Send link
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

export default ResetPasswordScreen;
