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
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
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

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
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
        alert(err.message);
      });
  };
  const handleHaveAccount = async () => {
    navigation.navigate("LoginScreen")
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} />
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontWeight: "bold",
              marginVertical: Spacing * 2,
            }}
          >
            Create an account
          </Text>
          <Text
            style={{
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Let’s start our journey together!
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
        <AppTextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          
          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <AppTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          ></AppTextInput>
          <AppTextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          ></AppTextInput>
        </View>

        <TouchableOpacity
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 2,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.1,
            shadowRadius: Spacing,
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleHaveAccount}
        >
          <Text style={styles.buttonText}>
            Already have an account?
          </Text>
        </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: Spacing ,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary, // Adjust the color to your preference
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colors.primary, // Adjust the color to your preference
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing*2,
  },
});

export default Register;
