import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
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
        navigation.navigate("LoginScreen");
      })
      .then((data) => {
        //success callback
        console.log("data ", data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
              marginVertical: Spacing * 3,
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

        <TouchableOpacity
          style={{
            padding: Spacing * 3,
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: Colors.black,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Already have an account?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 2,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
